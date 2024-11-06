const fs = require("fs")

module.exports = function (app, addon) {

    //fires after addon installation
    app.all('/installed', async function (req, res, next) {
        try {
            const result = await global.database.collection(global.JiraAccountInfoStore).findOne({"installed.clientKey": req.body.clientKey});
            if (!result) {
                await global.database.collection(global.JiraAccountInfoStore).insertOne(req.body);
            } else {
                await global.database.collection(global.JiraAccountInfoStore).updateOne({"installed.clientKey": req.body.clientKey}, {$set: req.body});
            }
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    });

    app.get('/', function (req, res) {
        res.format({
            'text/html': function () {
                res.redirect('/atlassian-connect.json');
            },
            'application/json': function () {
                res.redirect('/atlassian-connect.json');
            }
        });
    });


    app.get('/main-page', addon.authenticate(), async function (req, res) {
        res.sendFile(path.join(__dirname,'..', '..', 'dist', 'index.html'))
    });

    app.post('/main-page', addon.checkValidToken(), async function (req, res) {

    });

    // load any additional files you have in routes and apply those to the app
    {
        var path = require('path');
        var files = fs.readdirSync("server/routes");
        for (var index in files) {
            var file = files[index];
            if (file === "index.js") continue;
            // skip non-javascript files
            if (path.extname(file) != ".js") continue;

            var routes = require("./" + path.basename(file));

            if (typeof routes === "function") {
                routes(app, addon);
            }
        }
    }
};

