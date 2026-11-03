
// GET THE CALCULATOR DISPLAY
let display = document.getElementById("display");

// ADD NUMBERS AND OPERATORS
function appendValue(value) {

    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }

}

// CLEAR THE DISPLAY
function clearDisplay() {
    display.value = "0";
}

// DELETE THE LAST CHARACTER
function deleteNumber() {

    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
    }

}

// CALCULATE THE RESULT
function calculate() {

    try {

        let expression = display.value;

        // ALLOW ONLY VALID CALCULATOR CHARACTERS
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        // CONVERT PERCENTAGE INTO DECIMAL
        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        // CHECK FOR INVALID RESULTS
        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = Number(
            result.toPrecision(12)
        );

    } catch (error) {

        display.value = "Error";

    }

}
