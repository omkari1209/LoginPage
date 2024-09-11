// Get form elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const apiResponse = document.getElementById('apiResponse');
const spinner = document.getElementById('spinner');
const showPasswordCheckbox = document.getElementById('showPassword');

// Show/Hide Password Functionality
showPasswordCheckbox.addEventListener('change', () => {
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});

// Form Validation
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateForm() {
    let valid = true;
    // Clear previous errors
    usernameError.textContent = '';
    passwordError.textContent = '';
    apiResponse.textContent = '';

    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Email is required.';
        valid = false;
    } else if (!validateEmail(usernameInput.value.trim())) {
        usernameError.textContent = 'Invalid email format.';
        valid = false;
    }

    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        valid = false;
    } else if (passwordInput.value.trim().length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
    }

    return valid;
}

// Handle Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Show spinner
        spinner.style.display = 'block';

        const data = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };

        // Simulate API call
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            // Hide spinner
            spinner.style.display = 'none';

            if (response.ok) {
                apiResponse.style.color = 'green';
                apiResponse.textContent = 'Login successful!';
                loginForm.reset();
            } else {
                apiResponse.style.color = 'red';
                apiResponse.textContent = 'Login failed. Please try again.';
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            apiResponse.style.color = 'red';
            apiResponse.textContent = 'An error occurred. Please try again.';
            console.error('Error:', error);
        });
    }
});
