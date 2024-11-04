require('dotenv').config()

module.exports = function (app, addon) {
    app.get('/api/filters', async function (req, res) {

        const jiraDomain = process.env.REACT_APP_JIRA_DOMAIN;
        const apiToken = process.env.REACT_APP_JIRA_API_TOKEN;

        const credentials = `vshtinda23@gmail.com:${apiToken}`;
        const base64Credentials = Buffer.from(credentials).toString('base64');

        try {
            const response = await fetch(`${jiraDomain}/rest/api/3/filter/favourite`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Accept': 'application/json'
                }
            });


            if (!response.ok) {
                throw new Error('Failed to fetch filters');
            }

            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching filters:', error);
            res.status(500).send('Error fetching filters');
        }
    });

    app.get('/api/status', async function (req, res) {

        const jiraDomain = process.env.REACT_APP_JIRA_DOMAIN;
        const apiToken = process.env.REACT_APP_JIRA_API_TOKEN;

        const credentials = `vshtinda23@gmail.com:${apiToken}`;
        const base64Credentials = Buffer.from(credentials).toString('base64');

        try {
            const response = await fetch(`${jiraDomain}/rest/api/3/status`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Accept': 'application/json'
                }
            });


            if (!response.ok) {
                throw new Error('Failed to fetch filters');
            }

            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching filters:', error);
            res.status(500).send('Error fetching filters');
        }
    });

}

