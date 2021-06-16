class Calculator {
    constructor(prevDisplay, currDisplay) {
        this.prevDisplay = prevDisplay;
        this.currDisplay = currDisplay;
        this.MAX_DIGITS = 15;
        this.clear();
    }

    clear() {
        this.prevOperand = '';
        this.currOperand = '0';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        if (number === '.' && this.currOperand === '0') {
            this.currOperand = '0.';
        } else {
            if (this.currOperand.length > 0) {
                let digits = this.getDigits();
                if (digits.length < this.MAX_DIGITS) {
                    this.currOperand += number;
                } 
            } else {
                this.currOperand += number;
            }
        }
        
    }

    pickOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '−':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                if (curr === 0) {
                    alert("Cannot divide by 0!");
                } else {
                    computation = prev / curr;  
                }
                break;
            default:
                return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    percent() {
        const curr = parseFloat(this.currOperand);
        this.currOperand = (curr / 100);
    }

    formatNumber(number) {
        if (isNaN(number)) {
            this.clear();
            return;
        }
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        
        const parsedNumber = parseFloat(number);
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ''; 
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currDisplay.innerText = this.formatNumber(this.currOperand);
        if (this.operation != null) {
            this.prevDisplay.innerText = `${this.formatNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevDisplay.innerText = '';
        }
    }

    changeSign() {
        if (parseFloat(this.currOperand) > 0) {
            this.currOperand = parseFloat(this.currOperand) * -1;
            this.currOperand = this.currOperand.toString();
        } else if (this.currOperand.includes('-')) {
            this.currOperand = this.currOperand.substring(1);
        }
    }

    getDigits() {
        let numberPattern = /\d+/g;
        return this.currOperand.match(numberPattern).join("");
    }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const clearBtn = document.querySelector('[data-clear]');
const prevOperand = document.querySelector('[data-prev]');
const currOperand = document.querySelector('[data-curr]');
const equalBtn = document.querySelector('[data-equal]')
const percentBtn = document.querySelector('[data-percent]');
const changeSignBtn = document.querySelector('[data-change-sign');

const calculator = new Calculator(prevOperand, currOperand);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.pickOperation(button.innerText)
        calculator.updateDisplay();
    });
});

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

percentBtn.addEventListener('click', () => {
    calculator.percent();
    calculator.updateDisplay();
});

changeSignBtn.addEventListener('click', () => {
    calculator.changeSign();
    calculator.updateDisplay();
});