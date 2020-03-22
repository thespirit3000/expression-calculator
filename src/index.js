function eval() {
  // Do not use eval!!!
  return;
}
const signs = ['/', '*', '-', '+'];

const operators = {
  '/': function (a, b) {
    if (b == 0) {
      throw new TypeError("TypeError: Division by zero.");
    }
    return a / b
  },
  '*': function (a, b) {
    return a * b
  },
  '-': function (a, b) {
    return a - b
  },
  '+': function (a, b) {
    return a + b
  },
}

const formatExpression = (expr) => {
  expr = expr.split(' ').join('');
  expr = expr.split('+').join(' + ');
  expr = expr.split('-').join(' - ');
  expr = expr.split('*').join(' * ');
  expr = expr.split('(').join(' ( ');
  expr = expr.split(')').join(' ) ');
  expr = expr.split('/').join(' / ');
  expr = expr.split('  ').join(' ');
  return expr.trim();
}

const pairedBrackets = (expr) => {
  let count = 0;
  let prevElement = '';
  let exprArray = formatExpression(expr).split(' ');
  exprArray.forEach(element => {
    if (element === '(') {
      prevElement = '(';
      count += 1;
    } else {
      if (element === ")") {
        count -= 1;
      }
    }
  })
  if (count !== 0) {
    throw new Error('ExpressionError: Brackets must be paired');
  }
}

function calculate(exprArray) {
  for (let index = 0; index < 4;) {
    let sign = exprArray.indexOf(signs[index]);
    if (sign > 0) {
      exprArray[sign - 1] = operators[exprArray[sign]](+exprArray[sign - 1], +exprArray[sign + 1]);
      exprArray.splice(sign, 2);
    } else {
      index += 1;
    }
  }
  return exprArray[0]
}

function bracketsCheck(exprArray) {
  let endPosition = exprArray.indexOf(')');
  let startPosition = exprArray.slice(0, endPosition).lastIndexOf('(') + 1;
  return [startPosition, endPosition];
}

function expressionCalculator(expr) {
  pairedBrackets(expr);
  let exprArray = formatExpression(expr).split(' ');
  if (exprArray.indexOf(')') > -1) {
    while (exprArray.indexOf(')' > -1)) {
      let [startPosition, endPosition] = bracketsCheck(exprArray);
      let innerArray = exprArray.slice(startPosition, endPosition);
      let innerLength = innerArray.length;
      let result = calculate(innerArray);
      exprArray.splice(startPosition, innerLength + 1);
      exprArray[startPosition - 1] = result.toString();
      if (exprArray.indexOf(')') === -1) {
        return calculate(exprArray);
      }
    }
  } else {
    return calculate(exprArray);
  }
}
module.exports = {
  expressionCalculator
}