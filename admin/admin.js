const clientId = 'Iv23liQruJB6iss6Kgh5'; // Replace with your actual GitHub OAuth Client ID
const redirectUri = `${window.location.origin}/admin/admin.html`; 

// Redirect to GitHub for login
document.getElementById('login-btn').href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

// After GitHub login, handle OAuth code
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    // Send the OAuth code to your serverless function for token exchange
    fetch('https://netshadowm.netlify.app/.netlify/functions/github-auth', {  // Correct the Netlify URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }), // Send the OAuth code
    })
    .then(res => res.json())
    .then(data => {
        if (data.access_token) {
            // Fetch GitHub user data using the access token
            fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${data.access_token}`,
                },
            })
            .then(res => res.json())
            .then(user => {
                // Check if the logged-in user is authorized (by GitHub username)
                if (user.login === 'NetShadowM') { // Replace with your GitHub username
                    alert('Admin authenticated successfully!');
                    // Show the admin dashboard
                    document.getElementById('login-section').style.display = 'none';
                    document.getElementById('dashboard').style.display = 'block';
                    localStorage.setItem('auth', 'true');
                } else {
                    alert('Unauthorized user!');
                }
            });
        } else {
            document.getElementById('login-error').textContent = 'GitHub authentication failed.';
        }
    })
    .catch(error => {
        console.error('Error during authentication process:', error);
        document.getElementById('login-error').textContent = 'Error during authentication process.';
    });
}



// Load existing content from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const aboutContent = localStorage.getItem('aboutContent') || 'Default About Content';
    const projectContent = localStorage.getItem('projectContent') || 'Default Project Data';

    document.getElementById('about-text').value = aboutContent;
    document.getElementById('project-data').value = projectContent;
});

// Save updated About Me content
document.getElementById('save-about').addEventListener('click', () => {
    const aboutText = document.getElementById('about-text').value;
    localStorage.setItem('aboutContent', aboutText);
    alert('About Me updated!');
});

// Save updated Projects content
document.getElementById('save-projects').addEventListener('click', () => {
    const projectText = document.getElementById('project-data').value;
    localStorage.setItem('projectContent', projectText);
    alert('Projects updated!');
});