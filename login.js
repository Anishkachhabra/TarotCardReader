// Enhanced Login with Email Authentication
window.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const alertBox = document.querySelector('.error');
        let errorMsg = '';

        // --- Validation ---
        if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) {
            errorMsg += 'A valid email address is required.\n';
        }
        if (!password || password.value.length < 8) {
            errorMsg += 'Password must be at least 8 characters.\n';
        }

        if (errorMsg) {
            alertBox.textContent = errorMsg;
            alertBox.style.color = 'red';
            return;
        }

        // --- Admin Check ---
        const adminEmail = 'admin@astralis.com';
        const adminPassword = 'Admin@123';

        if (email.value.toLowerCase() === adminEmail.toLowerCase() && password.value === adminPassword) {
            alertBox.textContent = 'Admin login successful!';
            alertBox.style.color = 'green';
            loginForm.reset();
            setTimeout(() => window.location.href = 'admin.html', 1500);
            return;
        }

        // --- Normal User Login ---
        let users = JSON.parse(localStorage.getItem('userData')) || [];

        const user = users.find(
            u => u.email.toLowerCase() === email.value.toLowerCase() && u.password === password.value
        );

        if (user) {
            localStorage.setItem('currentUser', email.value.trim());
            alertBox.textContent = `Welcome back, ${user.username}!`;
            alertBox.style.color = 'green';
            loginForm.reset();

            setTimeout(() => {
                window.location.href = 'landing.html';
            }, 1500);
        } else {
            alertBox.textContent = 'Invalid email or password.';
            alertBox.style.color = 'red';
        }
    });
});

// Auto logout when window closed/refreshed
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('currentUser');
});
