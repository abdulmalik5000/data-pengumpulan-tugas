// auth.js - Handle authentication
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Redirect logic
    if (window.location.pathname.includes('tugas.html') && !currentUser) {
        window.location.href = 'login.html';
    }
    
    if ((window.location.pathname.includes('login.html') || 
         window.location.pathname.includes('register.html')) && currentUser) {
        window.location.href = 'tugas.html';
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (username && password) {
                // In a real app, you would validate against a server
                const user = {
                    username: username,
                    role: username === 'guru' ? 'teacher' : 'student'
                };
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'tugas.html';
            } else {
                alert('Silakan isi semua field');
            }
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const role = document.getElementById('regRole').value;
            
            // Validation
            if (!username || !email || !password || !confirmPassword || !role) {
                alert('Silakan isi semua field');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok');
                return;
            }
            
            // Save user (in a real app, you would send to a server)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password, role });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Pendaftaran berhasil! Silakan login.');
            window.location.href = 'login.html';
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});
