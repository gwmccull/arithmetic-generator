'use strict';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../src/consumer/consumer');

chai.use(chaiHttp);

describe('consumer', function() {
    describe('POST', function () {
        it('should respond', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+2=' })
                .end(function (res) {
                    res.should.have.status(200);
                    done();
                });

        });
        it('should respond with the correct answer', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+4=' })
                .end(function (err, res) {
                    res.body.solution.should.equal(5);
                    done();
                });
        });
        it('should respond with an error', function (done) {
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+a=' })
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.body.error.should.equal('One of the values is NaN');
                    done();
                });
        });
    });
});
