// Login form validation and user authentication
window.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var username = document.getElementById('username');
            var password = document.getElementById('password');
            var errorMsg = '';

            if (!username || username.value.trim() === '') {
                errorMsg += 'Username is required.\n';
            }
            if (!password || password.value.length < 6) {
                errorMsg += 'Password must be at least 6 characters.\n';
            }

            var alertBox = document.querySelector('.error');
            if (errorMsg) {
                if (alertBox) {
                    alertBox.textContent = errorMsg;
                    alertBox.style.color = 'red';
                } else {
                    alert(errorMsg);
                }
                return;
            }

            // Check for admin credentials first
            var adminUsername = 'admin';
            var adminPassword = 'admin123';

            if (username.value === adminUsername && password.value === adminPassword) {
                if (alertBox) {
                    alertBox.textContent = 'Admin login successful!';
                    alertBox.style.color = 'green';
                } else {
                    alert('Admin login successful!');
                }
                loginForm.reset();
                
                // Redirect to admin page after short delay
                setTimeout(function () {
                    window.location.href = 'admin.html';
                }, 1500);
                return; // Stop further execution
            }

            // Retrieve user data from localStorage
            var userData = localStorage.getItem('userData');
            if (userData) {
                userData = JSON.parse(userData);
                // Find user in the array of users
                var foundUser = userData.find(function (user) {
                    return username.value === user.username &&
                        password.value === user.password;
                });

                if (foundUser) {
                    localStorage.setItem('currentUser', username.value); // Set current logged-in user
                    if (alertBox) {
                        alertBox.textContent = 'Login successful!';
                        alertBox.style.color = 'green';
                    } else {
                        alert('Login successful!');
                    }
                    loginForm.reset();
                    // Optionally redirect to another page
                    // window.location.href = 'index.html';
                } else {
                    if (alertBox) {
                        alertBox.textContent = 'Invalid username or password.';
                        alertBox.style.color = 'red';
                    } else {
                        alert('Invalid username or password.');
                    }
                    return;
                }
            } else {
                if (alertBox) {
                    alertBox.textContent = 'No user found. Please sign up first.';
                    alertBox.style.color = 'red';
                } else {
                    alert('No user found. Please sign up first.');
                }
            }


            setTimeout(function () {
                window.location.href = 'landing.html';
            }, 1500);
        });
    }
});

// Log out user automatically when tab/window is closed or refreshed
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('currentUser');
});
