function eval() {
    // Do not use eval!!!
    return;
}

const operators = {
    '/': function(a,b) {return a/b},
    '*': function(a,b) {return a*b},
    '-': function(a,b) {return a-b},
    '+': function(a,b) {return a+b},
}

const signs = ['/', '*', '-', '+']

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g,'')
    expr = expr.replace('+',' + ');
    expr = expr.replace('-',' - ');
    expr = expr.replace('/',' / ');
    let exprArray = expr.replace('*',' * ').trim().split(' ');
    console.log(exprArray);
    for (let index = 0; index < 4; ) {
        let sign = exprArray.indexOf(signs[index]);
        if(sign > 0){
            exprArray[sign - 1] = operators[exprArray[sign]](+exprArray[sign-1], +exprArray[sign+1]);
            exprArray.splice(sign, 2);
        }else{
            index += 1;
        }
    }
    return exprArray[0]
}


module.exports = {
    expressionCalculator
}