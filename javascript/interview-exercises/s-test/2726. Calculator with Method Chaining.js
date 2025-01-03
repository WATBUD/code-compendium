class Calculator {
    constructor(initialValue = 0) {
        // Initialize the result with the given initial value
        this.result = initialValue;
    }

    // Add the given value to the result
    add(value) {
        this.result += value;
        return this; // Enable method chaining
    }

    // Subtract the given value from the result
    subtract(value) {
        this.result -= value;
        return this; // Enable method chaining
    }

    // Multiply the result by the given value
    multiply(value) {
        this.result *= value;
        return this; // Enable method chaining
    }

    // Divide the result by the given value
    divide(value) {
        if (value === 0) {
            throw new Error("Division by zero is not allowed."); // Handle division by zero
        }
        this.result /= value;
        return this; // Enable method chaining
    }

    // Raise the result to the power of the given value
    power(value) {
        this.result = Math.pow(this.result, value);
        return this; // Enable method chaining
    }

    // Get the current result
    getResult() {
        return this.result;
    }
}

// Example usage
const calc = new Calculator(10);
console.log(calc.add(5).subtract(7).getResult()); // Output: 8

const calc2 = new Calculator(2);
console.log(calc2.multiply(3).power(3).divide(2).getResult()); // Output: 27

// Handling division by zero
try {
    const calc3 = new Calculator(10);
    calc3.divide(0); // Should throw an error
} catch (err) {
    console.error(err.message); // Output: Division by zero is not allowed.
}
