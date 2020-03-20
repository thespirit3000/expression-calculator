function eval() {
    // Do not use eval!!!
    return;
}
const signs = ['/', '*', '-', '+'];

const operators = {
    '/': function(a,b) {
      if (b == 0) {
        throw new TypeError("TypeError: Division by zero.");
      }
      return a/b},
    '*': function(a,b) {return a*b},
    '-': function(a,b) {return a-b},
    '+': function(a,b) {return a+b},
}

const formatExpression = (expr) => {
  expr = expr.split(' ').join('');
  expr = expr.split('+').join(' + ');
  expr = expr.split('-').join(' - ');
  expr = expr.split('*').join(' * ');
  expr = expr.split('(').join(' ( ');
  expr = expr.split(')').join(' ) ');
  expr = expr.split('/').join(' / ');
  return expr;
}

const pairedBrackets = (expr) => {  
  let count = 0;
  let prevElement = '';
  let exprArray = formatExpression(expr).split(' ');
  exprArray.forEach(element => {
    if (element === '('){
      prevElement = '(';
      count += 1;
    }else{
      if (element === ")"){
        count -=1;
      }
    }
  })
  if (count !== 0 ){
    throw new Error('ExpressionError: Brackets must be paired');
  }
}

function calc(exprArray){
  const endBracket = exprArray.indexOf(')');
  for (let index = endBracket - 1; index > 0; index--) {
    if(exprArray[index] === '(') {return index};
  }
}



function expressionCalculator(expr) {
  pairedBrackets(expr);
  
  let exprArray = formatExpression(expr).split(' ');
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