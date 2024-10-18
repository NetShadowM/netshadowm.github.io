const axios = require('axios');

exports.handler = async (event) => {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': 'https://netshadowm.github.io', // Allow your GitHub Pages domain
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST requests and handle preflight
    };

    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'CORS preflight check passed',
        };
    }

    // Check if method is not POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: 'Method Not Allowed',
        };
    }

    // Parse the incoming request body
    const { code } = JSON.parse(event.body);

    try {
        // Send request to GitHub for token exchange
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,   // Use environment variable for Client ID
            client_secret: process.env.GITHUB_CLIENT_SECRET, // Use environment variable for Client Secret
            code,
        }, {
            headers: { 'Accept': 'application/json' },
        });

        // Get access token from GitHub response
        const { access_token } = response.data;

        // Return the access token with CORS headers
        return {
            statusCode: 200,
            headers,  // Include CORS headers in the response
            body: JSON.stringify({ access_token }),
        };
    } catch (error) {
        // Handle any errors that occur during the token exchange
        return {
            statusCode: 500,
            headers,  // Include CORS headers in error response
            body: JSON.stringify({ error: 'OAuth token exchange failed' }),
        };
    }
};
