'use strict';

var equationGenerator = function() {
    return equationGenerator.generateEquation(
        equationGenerator.generateValue(),
        equationGenerator.generateValue(),
        equationGenerator.generateOperand()
    );
};

equationGenerator.generateOperand = function() {
    return '+';
};

equationGenerator.generateValue = function(min, max) {
    if(!min) {
        min = 1;
    }

    if(!max) {
        max = 10;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

equationGenerator.generateEquation = function(value1, value2, operand) {
    return value1.toString() + operand + value2.toString() + '=';
};

module.exports = equationGenerator;