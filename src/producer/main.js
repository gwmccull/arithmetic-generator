var http = require('http');

var app = require('./producer');

http.createServer(app).listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running at port 3001');
});