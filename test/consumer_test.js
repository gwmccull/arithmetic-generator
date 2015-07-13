var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');
var http = require('http');
var server = require('../src/consumer/consumer');
//var app = server();
var request = require('supertest');

chai.use(chaiHttp);

describe('consumer', function() {
    describe('POST', function () {
        it('should respond', function () {
            //console.log("app",server);
            chai.request(server)
                .post('/api/equation')
                .send({ equation: '1+2=' })
                .end(function (err, res) {
                    console.log("response",res.body);
                    console.log("err",err);
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.body.solution.should.be.equal(3);
                });
        });
    });
});
