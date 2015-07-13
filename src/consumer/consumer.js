var connect = require('connect');
var bodyParser = require('body-parser');
var send = require('connect-send-json');
var morgan = require('morgan');
var equationSolver = require('./equation-solver/equationSolver');
//var http = require('http');


var app = connect();

app.use(bodyParser.json({extended: true}));
app.use(morgan('tiny'));
app.use(send.json());

app.use('/api/equation', function (req, res, next) {
    if (req.method === 'POST') {
        console.log("POST", req.body);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({ "solution": "3" }));
        res.end();
    }
    next();
});

// respond to all requests
app.use(function (req, res) {
    res.end('Hello from Connect!\n');
});

module.exports = app;