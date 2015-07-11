var equationSolver = function(equation) {
    var equation = equation;
};

equationSolver.parseOperand = function(equation) {
    var re = /[\+\*\/\-]/g;
    return re.exec(equation)[0];
};


module.exports = equationSolver;