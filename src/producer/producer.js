var connect = require('connect');
var bodyParser = require('body-parser');
var send = require('connect-send-json');
var morgan = require('morgan');
var equationSolver = require('./equation-generator/equationGenerator');
//var http = require('http');
var request = require('request');

//var app = connect();

//app.use(bodyParser.json({extended: true}));
//app.use(morgan(':date[iso] :method :url :response-time ms'));
//app.use(send.json());

makeRequest();

module.exports = app;

function makeRequest() {

    request({
        method: 'POST',
        uri: 'http://localhost:3000/api/equation',
        json: true,
        body: { equation: '1+2=' }
    }, function(error, response, body) {
        console.log("res", body);
        //makeRequest();
    });
}