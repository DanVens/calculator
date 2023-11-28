let display = document.getElementById("display");
let expression = "";

function appendToDisplay(value) {
    // Clear the "Infinity" message or any error when a new input is detected
    if (!isFinite(display.value) || display.value.includes("Error")) {
        display.value = "";
    }

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    display.value = "";
    expression = "";
}

function calculate() {
    try {
        // Use math.js to evaluate the expression
        let result = math.evaluate(expression);

        // Display the result
        display.value = result;
        expression = result.toString(); // Store the result for further calculations
    } catch (error) {
        // Handle errors by displaying appropriate messages
        if (error.message === "Undefined symbol !") {
            display.value = "Error: Invalid Expression";
        } else {
            display.value = "Error";
        }
        expression = ""; // Clear the expression in case of an error
    }
}

// Custom expression parser
function parseExpression(expression) {
    // Replace '^' with '**' for general power
    expression = expression.replace(/\^/g, '**');

    // Handle square root
    expression = expression.replace(/sqrt\(([^)]+)\)/g, function(match, content) {
        return 'Math.sqrt(' + content + ')';
    });

    // Handle factorial (!) operation
    expression = expression.replace(/(\d+)!/g, function(match, num) {
        return factorial(parseInt(num)).toString();
    });

    // Use math.js to evaluate the expression
    let result = math.evaluate(expression);

    // Check for division by zero
    if (!isFinite(result)) {
        throw new Error("Division by zero");
    }

    return result;
}

// Factorial function
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

function addRoot() {
    // Check if there's a number or closing parenthesis before 'sqrt(' and add a multiplication symbol if needed
    let lastChar = expression.slice(-1);
    let secondLastChar = expression.slice(-2, -1);

    if (isNaN(lastChar) || lastChar === ")" || (lastChar === "(" && isNaN(secondLastChar))) {
        appendToDisplay('*sqrt(');
    } else {
        appendToDisplay('sqrt(');
    }
}
function addSquared() {
    // Add ^2 for squaring
    appendToDisplay('^2');
}

function addPower() {
    // Add ^ for general power
    appendToDisplay('^');
}

function addParenthesis(open) {
    appendToDisplay(open ? '(' : ')');
}

function addFactorial() {
    // Add ! for factorial
    appendToDisplay('!');
}

function addModulo() {
    appendToDisplay('%');
}
