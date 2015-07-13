var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');
//var http = require('http');
var server = require('../src/consumer/consumer');
//var app = server();
//var request = require('supertest');

chai.use(chaiHttp);

describe('consumer', function() {
    describe('POST', function () {
        it('should respond', function () {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+2=' })
                .end(function (err, res) {
                    res.statusCode.should.have.status(200);
                });

        });
        it('should respond with the correct answer', function () {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+4=' })
                .end(function (err, res) {
                    var solution = res.body.solution;
                    solution.should.equal(5);
                });
        });
    });
});
