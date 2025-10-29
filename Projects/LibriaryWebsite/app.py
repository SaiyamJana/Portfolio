from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional, Dict
import re
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
import json
from pathlib import Path
import asyncio

app = FastAPI(title="Book Vault API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
SECRET_KEY = "your-super-secret-key-keep-it-safe"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DB_FILE = "database.json"

# Initialize database file if it doesn't exist
if not Path(DB_FILE).exists():
    with open(DB_FILE, "w") as f:
        json.dump({"users": {}}, f)

# Security setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# File lock for concurrent access
file_lock = asyncio.Lock()

# Models
class UserCreate(BaseModel):
    name: str = Field(..., min_length=2)
    college_id: str
    password: str = Field(..., min_length=6)

    @validator('college_id')
    def validate_college_id(cls, v):
        if not re.match(r'^2023CSB(0[0-9]{2}|1[01][0-5])$', v):
            raise ValueError('Invalid college ID format')
        return v

    @validator('password')
    def validate_password(cls, v):
        if not re.search(r'[!@#$%^&*]', v):
            raise ValueError('Password must contain at least one special character')
        return v

class UserInDB(BaseModel):
    name: str
    college_id: str
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Database functions
async def read_db():
    async with file_lock:
        with open(DB_FILE, "r") as f:
            return json.load(f)

async def write_db(data):
    async with file_lock:
        with open(DB_FILE, "w") as f:
            json.dump(data, f, indent=4)

# Security functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_user(college_id: str):
    db = await read_db()
    user_data = db["users"].get(college_id)
    if user_data:
        return UserInDB(**user_data)
    return None

async def authenticate_user(college_id: str, password: str):
    user = await get_user(college_id)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        college_id: str = payload.get("sub")
        if college_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user = await get_user(college_id)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# Routes
@app.post("/api/users/create")
async def create_user(user: UserCreate):
    db = await read_db()
    
    if user.college_id in db["users"]:
        raise HTTPException(status_code=400, detail="User already registered")
    
    hashed_password = get_password_hash(user.password)
    user_data = {
        "name": user.name,
        "college_id": user.college_id,
        "hashed_password": hashed_password
    }
    
    db["users"][user.college_id] = user_data
    await write_db(db)
    
    return {"message": "User created successfully"}

@app.post("/api/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect college ID or password")
    
    access_token = create_access_token(data={"sub": user.college_id})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/users/me")
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return {"name": current_user.name, "college_id": current_user.college_id}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

