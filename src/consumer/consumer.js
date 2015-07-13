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
        if (!req.body.equation) {
            res.statusCode = 400;
            res.json({
                error: "Request Body missing the equation."
            });
        } else {
            var solution = equationSolver(req.body.equation);

            if (solution instanceof Error) {
                res.statusCode = 500;
                res.json({
                    error: solution.message
                });
            } else {
                res.statusCode = 200;
                res.json({
                    solution: solution
                });
            }
        }

        res.end();
        return;
    }

    // that method hasn't been implemented.  Try the next route
    next();
});

// response for all requests (if end hasn't already been called)
app.use(function (req, res) {
    res.statusCode = 200;
    res.write('Welcome to the Equation Parser!\n');
    res.write('The API endpoint is /api/equation\n');
    res.write('Posting an equation to this endpoint will return the solution.\n');
    res.write('Example, POST { "equation": "1+2=" } will result in a response of { "solution": 3 }\n');
    res.end('Thank you!\n');
});

module.exports = app;