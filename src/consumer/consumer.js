var connect = require('connect');
var bodyParser = require('body-parser');
var send = require('connect-send-json');
var morgan = require('morgan');
var equationSolver = require('./equation-solver/equationSolver');

var app = connect();

app.use(bodyParser.json({extended: true}));
app.use(morgan(':date[iso] :method :url :response-time ms'));
app.use(send.json());

app.use('/api/equation', function (req, res, next) {
    if (req.method === 'POST') {
        console.log("body", req);
        if (!req.body.equation) {
            res.statusCode = 400;
            res.json({
                error: "Request Body missing the equation."
            });
            next();
        } else {
            var solution = equationSolver(req.body.equation);

            if (solution instanceof Error) {
                res.statusCode = 500;
                res.json({
                    error: solution.message
                });
                next();
            } else {
                res.json({
                    solution: solution
                });
                next();
            }

        }
    }

    next();
});

// respond to all requests (if end hasn't already been called)
app.use(function (req, res) {
    res.end('Hello from Connect!\n');
});

module.exports = app;