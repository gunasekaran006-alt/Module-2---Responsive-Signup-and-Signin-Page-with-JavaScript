document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Show/Hide Password Toggle ---
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.textContent = "Hide";
            } else {
                input.type = "password";
                this.textContent = "Show";
            }
        });
    });

    // --- 2. Validation Helper Functions ---
    const showError = (inputId, errorId, show) => {
        const input = document.getElementById(inputId);
        const errorText = document.getElementById(errorId);
        if (show) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            errorText.classList.remove('d-none');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorText.classList.add('d-none');
        }
    };

    // --- 3. SignUp Logic ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Values
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const city = document.getElementById('city').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();

            // Name Validation
            if (name === "") { showError('fullName', 'nameError', true); isValid = false; } 
            else { showError('fullName', 'nameError', false); }

            // Email Validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) { showError('email', 'emailError', true); isValid = false; } 
            else { showError('email', 'emailError', false); }

            // Phone Validation (Exactly 10 digits)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) { showError('phone', 'phoneError', true); isValid = false; } 
            else { showError('phone', 'phoneError', false); }

            // City Validation (Alphabets only)
            const cityRegex = /^[A-Za-z\s]+$/;
            if (!cityRegex.test(city) || city === "") { showError('city', 'cityError', true); isValid = false; } 
            else { showError('city', 'cityError', false); }

            // Password Validation (Min 8 chars, letter & number)
            const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passRegex.test(password)) { showError('password', 'passwordError', true); isValid = false; } 
            else { showError('password', 'passwordError', false); }

            // Confirm Password
            if (password !== confirmPassword || confirmPassword === "") { showError('confirmPassword', 'confirmError', true); isValid = false; } 
            else { showError('confirmPassword', 'confirmError', false); }

            // If valid, save to LocalStorage and redirect
            if (isValid) {
                const user = { name, email, phone, city, password };
                localStorage.setItem('registeredUser', JSON.stringify(user));
                alert("Signup Successful! Please sign in.");
                window.location.href = "SignIn.html";
            }
        });
    }

    // --- 4. SignIn Logic ---
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const alertBox = document.getElementById('loginAlert');

            if (email === "") { showError('loginEmail', 'loginEmailError', true); isValid = false; } 
            else { showError('loginEmail', 'loginEmailError', false); }

            if (password === "") { showError('loginPassword', 'loginPasswordError', true); isValid = false; } 
            else { showError('loginPassword', 'loginPasswordError', false); }

            if (isValid) {
                // Fetch registered user from LocalStorage
                const storedUserJSON = localStorage.getItem('registeredUser');
                
                if (storedUserJSON) {
                    const storedUser = JSON.parse(storedUserJSON);
                    
                    // Check credentials
                    if (email === storedUser.email && password === storedUser.password) {
                        // Success! Redirect to Tourist Landing Page
                        alertBox.classList.add('d-none');
                        window.location.href = "travelapp.html"; 
                    } else {
                        alertBox.classList.remove('d-none');
                    }
                } else {
                    // No user registered yet
                    alertBox.textContent = "No account found with this email. Please sign up first.";
                    alertBox.classList.remove('d-none');
                }
            }
        });
    }
});