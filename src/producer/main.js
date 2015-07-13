var http = require('http');

var app = require('./producer');

var port = process.argv[2] || 3001;

http.createServer(app).listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running at port ' + port);
});