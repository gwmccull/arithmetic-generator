var connect = require('connect');
var equationGenerator = require('./equation-generator/equationGenerator');
var request = require('request');

var app = connect();

makeRequest();

module.exports = app;

function makeRequest() {
    var startDate = Date.now();
    var equation = equationGenerator();
    request({
        method: 'POST',
        baseUrl: 'http://localhost:3000',
        url: '/api/equation',
        json: true,
        body: { equation: equation }
    }, function(error, response, body) {
        var endDate = Date.now();
        console.log('Equation: ' + equation + ' Solution: ' + body.solution + ' Elapsed Time: ' + (endDate - startDate) + 'ms');
        //makeRequest();
    });
}