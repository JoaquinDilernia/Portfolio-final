// HTML Elements
var btn = document.querySelectorAll('button');
var historial = document.querySelector('.historial');
var result = document.querySelector('.result');
// GLOBALS
var currentNumber = '';
var symbol = [];
var numbers = [];
var prevSymbol = '';
var resultado = null;
var limited_symbol = 0;
var firstTime = true;
var oneDecimal = 0;
var formmatter = new Intl.NumberFormat('en');
var Calc = /** @class */ (function () {
    function Calc(exNumero) {
        if (this.isAnOperation(exNumero)) {
            return;
        }
        if (exNumero === 'reset') {
            this.reset(true);
            return;
        }
        if (exNumero === 'del') {
            this.del();
            return;
        }
        if (exNumero === 'decimal') {
            this.setDecimal();
            return;
        }
        if (exNumero === 'output') {
            this.getOutput();
            return;
        }
        firstTime = false;
        currentNumber += exNumero;
        this.setCurrentNumber(currentNumber);
    }
    Calc.prototype.setCurrentNumber = function (numero) {
        if (numero.toString().length > 13) {
            return;
        }
        result.value = formmatter.format(parseFloat(currentNumber)).toString();
        limited_symbol = 0;
    };
    Calc.prototype.setSymbol = function (symb) {
        this.whatOperationIs(prevSymbol);
        if (result.value === numbers[numbers.length - 1]) {
            historial.innerText += result.value;
        }
        else {
            historial.innerText += formmatter.format(parseFloat(currentNumber));
        }
        currentNumber = '';
        historial.innerHTML += symb;
        limited_symbol++;
    };
    Calc.prototype.whatOperationIs = function (simbolo) {
        switch (simbolo) {
            case '+':
                this.addition();
                break;
            case '-':
                this.subtraction();
                break;
            case '*':
                this.multiplication();
                break;
            case '/':
                this.division();
                break;
            default:
                return;
        }
    };
    Calc.prototype.isAnOperation = function (isOperation) {
        if (isOperation === '+'
            || isOperation === '-'
            || isOperation === '*'
            || isOperation === '/') {
            oneDecimal = 0;
            console.log(oneDecimal);
            if (limited_symbol >= 1 || result.value === '') {
                return true;
            }
            symbol.push(isOperation);
            prevSymbol = symbol[symbol.length - 2];
            numbers.push(currentNumber);
            if (firstTime) {
                return true;
            }
            this.setSymbol(isOperation);
            return true;
        }
        return false;
    };
    Calc.prototype.addition = function () {
        resultado = parseFloat(numbers[numbers.length - 2]) + parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    };
    Calc.prototype.subtraction = function () {
        resultado = parseFloat(numbers[numbers.length - 2]) - parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    };
    Calc.prototype.multiplication = function () {
        resultado = parseFloat(numbers[numbers.length - 2]) * parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    };
    Calc.prototype.division = function () {
        resultado = parseFloat(numbers[numbers.length - 2]) / parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    };
    Calc.prototype.reset = function (total) {
        if (total) {
            result.value = '';
            historial.innerText = '';
            numbers = [];
            symbol = [];
            currentNumber = '';
            resultado = null;
            limited_symbol = 0;
            firstTime = true;
        }
        else {
            symbol = [];
            historial.innerText = '';
            resultado = null;
            limited_symbol = 0;
        }
    };
    Calc.prototype.del = function () {
        if (result.value === '') {
            return;
        }
        result.value = result.value.substring(0, result.value.length - 1);
        currentNumber = result.value;
    };
    Calc.prototype.setDecimal = function () {
        if (oneDecimal >= 1) {
            return;
        }
        oneDecimal++;
        result.value = currentNumber + '.';
        currentNumber = result.value;
    };
    Calc.prototype.getOutput = function () {
        if (firstTime) {
            return;
        }
        numbers.push(result.value);
        this.whatOperationIs(symbol[symbol.length - 1]);
        this.reset(false);
    };
    return Calc;
}());
var _loop_1 = function (i) {
    btn[i].addEventListener('click', function () {
        new Calc(btn[i].value);
    });
};
// Asign buttons events listener
for (var i = 0; i < 18; i++) {
    _loop_1(i);
}
