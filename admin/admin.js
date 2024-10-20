document.addEventListener('DOMContentLoaded', () => {

    const devProtection = false;  // Set to true to block DevTools, false during development

if (devProtection) {
    // Disable right-click and common DevTools shortcuts
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    document.addEventListener('keydown', (e) => {
        // F12 or Ctrl+Shift+I
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
            e.preventDefault();
            alert('Developer tools are disabled.');
        }
    });

    // Detect DevTools
    setInterval(() => {
        const devTools = new Function('debugger');
        try {
            devTools();
        } catch (e) {
            console.warn('Developer tools are open!');
            alert('Please close developer tools to continue.');
        }
    }, 1000); // Check every second
}


    const clientId = 'Iv23liQruJB6iss6Kgh5'; // Replace with your actual GitHub OAuth Client ID
    const redirectUri = `${window.location.origin}/admin/admin.html`;

    // Set the login button href
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;
    }

    console.log('Script is running. Checking for authentication...');

    // After GitHub login, handle OAuth code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        console.log('OAuth code received:', code);

        // Send the OAuth code to your serverless function for token exchange
        fetch('https://netshadowm.netlify.app/.netlify/functions/github-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }), // Send the OAuth code
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                console.log('Access token received:', data.access_token);

                // Fetch GitHub user data using the access token
                fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${data.access_token}`,
                    },
                })
                .then(res => res.json())
                .then(user => {
                    console.log('User data received:', user);

                    // Check if the logged-in user is authorized (by GitHub username)
                    if (user.login === 'NetShadowM') { // Replace with your GitHub username
                        alert('Admin authenticated successfully!');

                        // Get login and dashboard elements
                        const loginSection = document.getElementById('login-section');
                        const dashboard = document.getElementById('dashboard');

                        if (loginSection) loginSection.style.display = 'none';
                        if (dashboard) dashboard.style.display = 'block';

                        // Save auth status to localStorage
                        localStorage.setItem('auth', 'true');
                        console.log('Auth status saved to localStorage:', localStorage.getItem('auth'));

                        // Redirect to the edit-dashboard page
                        window.location.href = 'edit-dashboard.html';  // Correct redirection
                    } else {
                        alert('Unauthorized user!');
                    }
                });
            } else {
                const loginError = document.getElementById('login-error');
                if (loginError) loginError.textContent = 'GitHub authentication failed.';
                console.error('GitHub authentication failed');
            }
        })
        .catch(error => {
            console.error('Error during authentication process:', error);
            const loginError = document.getElementById('login-error');
            if (loginError) loginError.textContent = 'Error during authentication process.';
        });
    }

    // Check if user is authenticated and redirect to the dashboard
    if (localStorage.getItem('auth') === 'true') {
        console.log('User is authenticated');

        const loginSection = document.getElementById('login-section');
        const dashboard = document.getElementById('dashboard');

        if (loginSection) loginSection.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
    } else {
        console.log('User is not authenticated');
    }
});

function dashboard(){
    window.location.href = "edit-dashboard.html";
}
function logOut() {
    localStorage.removeItem('auth');
    window.location.href = "admin.html";
}