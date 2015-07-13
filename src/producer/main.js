'use strict';

var http = require('http');

var port = process.argv[2] || 3001;

var app = require('./producer');
app.setPort(port);

http.createServer(app).listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Server is running at port ' + port);

    app.makeRequest();
});