async function checkvalidity() {
    let Name = document.querySelector(".input1").value;
    let Password = document.querySelector(".input2").value;
    
    if(Name === "" || Password === ""){
        alert("Please Enter name and password both");
        return false;
    }

    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${Name}&password=${Password}`
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store the token
            localStorage.setItem('token', data.access_token);
            window.location.href = "libriary.html";
            return true;
        } else {
            alert(data.detail || "Login failed");
            return false;
        }
    } catch (error) {
        alert("Error connecting to server");
        return false;
    }
}