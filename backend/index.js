const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var oauth2lib = require('oauth20-provider');
var oauth2 = new oauth2lib({log: {level: 2}});

app.use(oauth2.inject());
app.use(bodyParser.json());

app.post('/token', oauth2.controller.token);

app.get('/authorization', isAuthorized, oauth2.controller.authorization, function(req, res) {
    // Render our decision page
    // Look into ./test/server for further information
    res.render('authorization', {layout: false});
});
app.post('/authorization', isAuthorized, oauth2.controller.authorization);

app.post('/', function (req, res, next) {

    console.log(req.body);
    res.send("Post methond is working\n")
  })

app.get('/', (req, res) => {
    res.send('Hello World.');
});

function isAuthorized(req, res, next) {
    if (req.session.authorized) next();
    else {
        var params = req.query;
        params.backUrl = req.path;
        res.redirect('/login?' + query.stringify(params));
    }
};

app.listen(3000, () => console.log('Gator app listening on port 3000!'));