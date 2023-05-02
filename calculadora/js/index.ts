// HTML Elements
const btn: any = document.querySelectorAll('button');
let historial = document.querySelector('.historial') as HTMLDivElement;
let result = document.querySelector('.result') as HTMLInputElement;
// GLOBALS
let currentNumber: string = '';
let symbol: any[] = [];
let numbers: any[] = [];
let prevSymbol: string = '';
let resultado: number = null;
let limited_symbol = 0;
let firstTime: boolean = true;
let oneDecimal: number = 0;
const formmatter = new Intl.NumberFormat('en');

class Calc {
    constructor(exNumero: string) {
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
    setCurrentNumber(numero: string): void {
        if (numero.toString().length > 13) {
            return;
        }
        result.value = formmatter.format(parseFloat(currentNumber)).toString();
        limited_symbol = 0;
    }
    setSymbol(symb: string) {
        this.whatOperationIs(prevSymbol);
        if (result.value === numbers[numbers.length - 1]) {
            historial.innerText += result.value;
        } else {
            historial.innerText += formmatter.format(parseFloat(currentNumber));
        }
        currentNumber = '';
        historial.innerHTML += symb;
        limited_symbol++;
    }
    whatOperationIs(simbolo: string) {
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
    }
    isAnOperation(isOperation: string): boolean {
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
    }
    addition() {
        resultado = parseFloat(numbers[numbers.length - 2]) + parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    }
    subtraction() {
        resultado = parseFloat(numbers[numbers.length - 2]) - parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    }
    multiplication() {
        resultado = parseFloat(numbers[numbers.length - 2]) * parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    }
    division() {
        resultado = parseFloat(numbers[numbers.length - 2]) / parseFloat(numbers[numbers.length - 1]);
        numbers.push(resultado);
        result.value = resultado.toFixed(2).toString();
    }
    reset(total: boolean) {
        if (total) {
            result.value = '';
            historial.innerText = '';
            numbers = [];
            symbol = [];
            currentNumber = '';
            resultado = null;
            limited_symbol = 0;
            firstTime = true;
        } else {
            symbol = [];
            historial.innerText = '';
            resultado = null;
            limited_symbol = 0;
        }
    }
    del() {
        if (result.value === '') {
            return;
        }
        result.value = result.value.substring(0, result.value.length - 1);
        currentNumber = result.value;
    }
    setDecimal() {
        if (oneDecimal >= 1) {
            return;
        }
        oneDecimal++;
        result.value = currentNumber + '.';
        currentNumber = result.value;
    }
    getOutput() {
        if (firstTime) {
            return;
        }        
        numbers.push(result.value);
        this.whatOperationIs(symbol[symbol.length - 1]);
        this.reset(false);
    }
}

// Asign buttons events listener

for (let i = 0; i < 18; i++) {
    btn[i].addEventListener('click', () => {
        new Calc(btn[i].value);
    });
}