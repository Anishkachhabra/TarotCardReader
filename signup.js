
window.addEventListener('DOMContentLoaded', function() {
	var signupForm = document.querySelector('form');
	if (signupForm) {
		signupForm.addEventListener('submit', function(e) {
			e.preventDefault();
			var username = document.getElementById('username');
			var email = document.getElementById('email');
			var password = document.getElementById('password');
			var errorMsg = '';

			// Basic validation
			if (!username || username.value.trim() === '') {
				errorMsg += 'Username is required.\n';
			}
			if (!email || !/^\S+@\S+\.\S+$/.test(email.value)) {
				errorMsg += 'Valid email is required.\n';
			}
			if (!password || password.value.length < 6) {
				errorMsg += 'Password must be at least 6 characters.\n';
			}

            var alert = document.querySelector('.error');

			if (errorMsg) {
                alert.textContent = errorMsg;
                alert.style.color = 'red';
				return;
			}

			// Store user data in localStorage
            // Get existing users or initialize empty array
            var existingUsers = JSON.parse(localStorage.getItem('userData')) || [];
            var userData = {
                username: username.value,
                signupTime: new Date().toISOString(),
                email: email.value,
                password: password.value // Note: In production, never store plain passwords
            };

            // If existingUsers is not an array (was storing a single user before), convert to array
            if (!Array.isArray(existingUsers)) {
                existingUsers = [existingUsers];
            }

            // Add new user to array
            existingUsers.push(userData);

            // Store updated array back to localStorage
            localStorage.setItem('userData', JSON.stringify(existingUsers));
            localStorage.setItem('currentUser', username.value); // Track current user
			alert.textContent = 'Signup successful!';
            alert.style.color = 'green';
			signupForm.reset();
		});
	}
});
