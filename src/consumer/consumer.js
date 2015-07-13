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
        if (!req.body.equation) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ "error": "Request Body missing the equation." }));
            res.end();
            next();
        } else {
            var solution = equationSolver(req.body.equation);

            if (solution instanceof Error) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(JSON.stringify({ "error": solution.message }));
                res.end();
                next();
            }

            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ "solution": solution }));
            res.end();
            next();
        }
    }

});

// respond to all requests (if end hasn't already been called)
app.use(function (req, res) {
    res.end('Hello from Connect!\n');
});

module.exports = app;