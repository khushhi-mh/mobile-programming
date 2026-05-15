let balance = 10000;
let pin = "1234";

function checkPin() {
    let enteredPin = prompt("Enter PIN:");

    if (enteredPin === pin) {
        return true;
    } else {
        document.getElementById("message").innerText = "Wrong PIN!";
        return false;
    }
}

function updateBalance() {
    document.getElementById("balanceText").innerText =
        "Balance: Rs. " + balance;
}

function deposit() {
    if (!checkPin()) return;

    let amount = Number(document.getElementById("amount").value);

    if (amount > 0) {
        balance += amount;
        document.getElementById("message").innerText =
            "Deposit successful!";
    } else {
        document.getElementById("message").innerText =
            "Invalid amount!";
    }

    updateBalance();
}

function withdraw() {
    if (!checkPin()) return;

    let amount = Number(document.getElementById("amount").value);

    if (amount > 0 && amount <= balance) {
        balance -= amount;
        document.getElementById("message").innerText =
            "Withdrawal successful!";
    } else {
        document.getElementById("message").innerText =
            "Invalid or insufficient balance!";
    }

    updateBalance();
}