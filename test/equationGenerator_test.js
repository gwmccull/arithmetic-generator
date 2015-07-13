var should = require('chai').should();
var equationGenerator = require('../src/producer/equation-generator/equationGenerator');


describe('equationGenerator', function() {
    describe('generateOperand', function() {
        it('should return a plus sign', function(){
            equationGenerator.generateOperand().should.equal('+');
        });
    });

    describe('generateValue', function() {
        it('should return a number', function() {
            equationGenerator.generateValue().should.be.a('number');
        });

        it('should return a number within the range', function() {
            var value = equationGenerator.generateValue(1, 10);
            value.should.be.at.most(10);
            value.should.be.at.least(1);
        });
    });

    describe('generateEquation', function() {
        it('should return a string', function() {
            equationGenerator.generateEquation(1, 2, '+').should.be.a('string');
        });

        it('should return an equation', function() {
            equationGenerator.generateEquation(1, 2, '+').should.equal('1+2=');
        });
    });

    describe('equationGenerator', function() {
        it('should return a random equation', function() {
            var equation = equationGenerator();

            equation.should.contain('+');
            equation.should.contain('=');
        })
    })
});
