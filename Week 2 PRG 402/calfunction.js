function calculate(operation) {
    let num1 = Number(document.getElementById("s1").value);
    let num2 = Number(document.getElementById("s2").value);
    let result;

    if (operation === "add") {
        result = num1 + num2;
    }
    else if (operation === "subtract") {
        result = num1 - num2;
    }
    else if (operation === "multiply") {
        result = num1 * num2;
    }
    else if (operation === "divide") {
        result = num1 / num2;
    }

    document.getElementById("result").innerText = "Result: " + result;
}