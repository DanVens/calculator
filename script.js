let display = document.getElementById("display");

function appendToDisplay(value) {
    // Clear the "Infinity" message or any error when a new input is detected
    if (!isFinite(display.value) || display.value.includes("Error")) {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

let lastButtonClickTime = 0;

function calculate() {
    // Ignore consecutive clicks within a short time frame
    const currentTime = new Date().getTime();
    if (currentTime - lastButtonClickTime < 500) {
        return;
    }

    try {
        let expression = display.value;

        // Use a custom expression parser to evaluate the expression
        let result = parseExpression(expression);

        // Display the result
        display.value = result;
    } catch (error) {
        // Handle errors by displaying appropriate messages
        if (error.message === "Division by zero") {
            display.value = "Error: Division by zero";
        } else {
            display.value = "Error";
        }
    }

    lastButtonClickTime = currentTime;
}

// Custom expression parser
function parseExpression(expression) {
    // Replace 'sqrt' with 'Math.sqrt'
    expression = expression.replace(/sqrt/g, 'Math.sqrt');

    // Replace '^' with '**' for general power
    expression = expression.replace(/\^/g, '**');

    // Handle leading zeros by converting them to decimal
    expression = expression.replace(/\b0+(\d+)/g, '$1');

    // Use eval to evaluate the expression
    let result = eval(expression);

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
        return n * factorial(n - 1);
    }
}

function addRoot() {
    // Check if there's a number before 'sqrt(' and add a multiplication symbol if needed
    let lastChar = display.value.slice(-1);
    if (!isNaN(lastChar) || lastChar === ")") {
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
