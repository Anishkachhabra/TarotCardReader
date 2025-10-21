// Enhanced Signup with Email Uniqueness & Password Strength
window.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const alertBox = document.querySelector('.error');
        let errorMsg = '';

        // --- Validation ---
        if (!username || username.value.trim() === '') {
            errorMsg += 'Username is required.\n';
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) {
            errorMsg += 'A valid email address is required.\n';
        }

        if (!password || password.value.trim() === '') {
            errorMsg += 'Password is required.\n';
        } else if (password.value.length < 8) {
            errorMsg += 'Password must be at least 8 characters.\n';
        } else if (!/[A-Z]/.test(password.value)) {
            errorMsg += 'Password must contain at least one uppercase letter.\n';
        } else if (!/[a-z]/.test(password.value)) {
            errorMsg += 'Password must contain at least one lowercase letter.\n';
        } else if (!/[0-9]/.test(password.value)) {
            errorMsg += 'Password must contain at least one number.\n';
        } else if (!/[!@#$%^&*]/.test(password.value)) {
            errorMsg += 'Password must contain at least one special character (!@#$%^&*).\n';
        }

        if (errorMsg) {
            alertBox.textContent = errorMsg;
            alertBox.style.color = 'red';
            return;
        }

        // --- Fetch existing users ---
        let users = JSON.parse(localStorage.getItem('userData')) || [];

        // --- Check for duplicate email ---
        const existingUser = users.find(u => u.email.toLowerCase() === email.value.toLowerCase());
        if (existingUser) {
            alertBox.textContent = 'Email already registered. Please log in instead.';
            alertBox.style.color = 'red';
            return;
        }

        // --- Create new user ---
        const newUser = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(), // Note: For production, use hashing (bcrypt)
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('userData', JSON.stringify(users));
        localStorage.setItem('currentUser', email.value.trim());

        alertBox.textContent = 'Signup successful! Redirecting...';
        alertBox.style.color = 'green';
        signupForm.reset();

        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 1500);
    });
});
