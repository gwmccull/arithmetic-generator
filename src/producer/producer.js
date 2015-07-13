'use strict';

var connect = require('connect');
var equationGenerator = require('./equation-generator/equationGenerator');
var request = require('request');
var now = require("performance-now");

var serverPort;
var app = connect();
app.setPort = function(port) {
    serverPort = port;
};

app.makeRequest = function() {
    var startDate = now();
    var equation = equationGenerator();
    request({
        method: 'POST',
        baseUrl: 'http://localhost:3000',
        url: '/api/equation',
        json: true,
        body: { equation: equation, port: serverPort }
    }, function(error, response, body) {
        var endDate = now();
        console.log('Equation: ' + equation + ' Solution: ' + body.solution + ' Elapsed Time: ' + (endDate - startDate) + 'ms');
        app.makeRequest();
    });
};

module.exports = app;
