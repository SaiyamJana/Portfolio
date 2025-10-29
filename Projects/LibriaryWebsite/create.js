async function validateForm() {
    const name = document.getElementById('name').value;
    const collegeId = document.getElementById('collegeId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    clearErrors();

    let valid = true;

    // Check if the name field is empty or too short
    if (name === "") {
        showError('name', "Name is required.");
        valid = false;
    } else if (name.length < 2) {
        showError('name', "Name must be at least 2 characters long.");
        valid = false;
    }

    // Check if the college ID field is empty or invalid format
    if (collegeId === "") {
        showError('collegeId', "College ID is required.");
        valid = false;
    } else if (!/^2023CSB(0[0-9]{2}|1[01][0-5])$/.test(collegeId)) {
        showError('collegeId', "College ID must be in the format: 2023CSBNNN, where NNN is between 001 and 115.");
        valid = false;
    }

    // Check if the password field is empty or too short
    if (password === "") {
        showError('password', "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        showError('password', "Password must be at least 6 characters long.");
        valid = false;
    } else if (!/[!@#$%^&*]/.test(password)) {
        showError('password', "Password must contain at least one special character (e.g., !@#$%^&*).");
        valid = false;
    }

    // Check if the confirm password field is empty or doesn't match
    if (confirmPassword === "") {
        showError('confirmPassword', "Please confirm your password.");
        valid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', "Passwords do not match.");
        valid = false;
    }

    if (valid) {
        try {
            const response = await fetch('http://localhost:8000/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    college_id: collegeId,
                    password: password
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert("Card successfully created!");
                window.location.href = "homepage.html";
            } else {
                alert(data.detail || "Failed to create card");
            }
        } catch (error) {
            alert("Error connecting to server");
        }
    }
}

// Function to highlight error in the form field and display message
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    inputElement.classList.add('error');
    const errorElement = document.getElementById(`${inputId}Error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to clear any previous error highlights and messages
function clearErrors() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.textContent = "";
        message.style.display = 'none';
    });
}