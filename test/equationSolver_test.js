var should = require('chai').should();
var expect = require('chai').expect;
var equationSolver = require('../src/consumer/equation-solver/equationSolver');


describe('equationSolver', function() {
    describe('parseOperand', function () {
        it('should return a plus sign', function() {
            equationSolver.parseOperand('1+2=').should.equal('+');
        });
        it('should return a minus sign', function() {
            equationSolver.parseOperand('1-2=').should.equal('-');
        });
        it('should return an asterisk', function() {
            equationSolver.parseOperand('1*2=').should.equal('*');
        });
        it('should return a forward slash', function() {
            equationSolver.parseOperand('1/2=').should.equal('/');
        });
        it('should an error if the operand isn\'t found or is not supported', function() {
            expect(function() { equationSolver.parseOperand('1^2=') }).to.throw(Error);
        });
    });

    describe('parseValues', function() {
        it('should return an array of values', function() {
            equationSolver.parseValues('1+2=', '+').should.be.a('array');
        });
        it('should return value 1 in position 1', function() {
            equationSolver.parseValues('1+2=', '+')[0].should.equal(1);
        });
        it('should return value 2 in position 2', function() {
            equationSolver.parseValues('1+2=', '+')[1].should.equal(2);
        });
        it('should handle a floating number', function() {
            equationSolver.parseValues('1+2.1=', '+')[1].should.equal(2.1);
        });
        it('should only handle 2 values', function() {
            expect(function() { equationSolver.parseValues('1+2+3=', '+') }).to.throw(Error);
        });
        it('should error if one value is NaN', function() {
            expect(function() { equationSolver.parseValues('1+a=', '+') }).to.throw(Error);
        });
    });

    describe('solveEquation', function() {
        it('should return the correct solution', function() {
            equationSolver.solveEquation(1, 2, '+').should.equal(3);
        });
        it('should return the correct solution', function() {
            equationSolver.solveEquation(1, 2, '-').should.equal(-1);
        });
        it('should return the correct solution', function() {
            equationSolver.solveEquation(1, 2, '*').should.equal(2);
        });
        it('should return the correct solution', function() {
            equationSolver.solveEquation(1, 2, '/').should.equal(.5);
        });
        it('should return an error for unsupported operands', function() {
            expect(function() { equationSolver.solveEquation(1, 2, '^') }).to.throw(Error)
        });
    });

    describe('equationSolver', function() {
        it('should solve an equation', function() {
            equationSolver('1+2=').should.equal(3);
        });
        it('should pass through errors', function() {
            equationSolver('1^2=').message.should.equal('Operand not found or not supported.');
        });
    })

});