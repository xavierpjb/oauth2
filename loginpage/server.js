var express = require('express');
var app = express();
var path = require('path');
const axios = require('axios');

// use it before all route definitions
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

publicPath = path.join(__dirname,'public');
//setting middleware
app.use(express.static(publicPath)); //Serves resources from public folder


app.get('/', function(req,res){
  res.sendFile(publicPath+"/index.html");
});

app.get('/login', function(req,res) {

  axios.get('https://webhook.site/996e4108-2d31-4586-ac08-a5f76914b3e5')
    .then( response =>{
      console.log(Object.keys(response));
      console.log(Object.keys(response.headers));
    })
    .catch(error => {
      console.log(error);
    });

  res.sendStatus(200);
})

app.listen(5000);