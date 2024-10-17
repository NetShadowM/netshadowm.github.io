const axios = require('axios');

exports.handler = async (event) => {
    const { code } = JSON.parse(event.body);

    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: Iv23liQruJB6iss6Kgh5,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: { 'Accept': 'application/json' },
        });

        const { access_token } = response.data;
        return {
            statusCode: 200,
            body: JSON.stringify({ access_token }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'OAuth token exchange failed' }),
        };
    }
};
