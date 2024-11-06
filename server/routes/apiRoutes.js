require('dotenv').config()

module.exports = function (app, addon) {

    const jiraDomain = process.env.REACT_APP_JIRA_DOMAIN;
    const apiToken = process.env.REACT_APP_JIRA_API_TOKEN;
    const email = process.env.REACT_APP_EMAIL

    const credentials = `${email}:${apiToken}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');

    const headers = {
        'Authorization': `Basic ${base64Credentials}`,
        'Accept': 'application/json'
    }

    app.get('/api/filters', async function (req, res) {

        try {
            const response = await fetch(`${jiraDomain}/rest/api/3/filter/favourite`, {
                method: 'GET',
                headers: headers
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

    app.get('/api/filters/:filterID', async function (req, res) {

        const filterID = req.params.filterID;

        try {
            const response = await fetch(`${jiraDomain}/rest/api/3/filter/${filterID}`, {
                method: 'GET',
                headers: headers
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

    app.get('/api/boardConfig', async function (req, res) {

        try {
            const response = await fetch(`${jiraDomain}/rest/agile/1.0/board/1/configuration`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch statuses');
            }

            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            res.status(500).send('Error fetching statuses');
        }
    });

    app.get('/api/search', async function (req, res) {
        const { selectedFilterJQL } = req.query;

        // Якщо параметр є, будуємо URL з фільтром
        const url = selectedFilterJQL
            ? `${jiraDomain}/rest/api/3/search?jql=${encodeURIComponent(selectedFilterJQL)}`
            : `${jiraDomain}/rest/api/3/search`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search');
            }

            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching search:', error);
            res.status(500).send('Error fetching search');
        }
    });

}

