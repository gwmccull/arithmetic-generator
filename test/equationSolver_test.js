var should = require('chai').should();
var equationSolver = require('../src/consumer/equation-solver/equationSolver');


describe('equationSolver', function() {
    describe('parseOperand', function () {
        it('should return a plus sign', function () {
            equationSolver.parseOperand('1+2=').should.equal('+');
        });
        it('should return a minus sign', function () {
            equationSolver.parseOperand('1-2=').should.equal('-');
        });
        it('should return an asterisk', function () {
            equationSolver.parseOperand('1*2=').should.equal('*');
        });
        it('should return a forward slash', function () {
            equationSolver.parseOperand('1/2=').should.equal('/');
        });
    });

});