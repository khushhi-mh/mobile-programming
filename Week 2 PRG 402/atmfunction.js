let balance = 10000;
let pin = "7539";

function checkPin() {
    let enteredPin = prompt("Enter PIN:");

    if (enteredPin === pin) {
        return true;
    } else {
        alert("Wrong PIN!");
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

    if (amount <= 0) {
        document.getElementById("message").innerText =
            "Invalid amount!";
    }
    else if (amount % 100 !== 0) {
        document.getElementById("message").innerText =
            "Deposit amount should be multiple of 100!";
    }
    else {
        balance += amount;
        document.getElementById("message").innerText =
            "Deposit successful!";
    }

    updateBalance();
}

function withdraw() {
    if (!checkPin()) return;

    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
        document.getElementById("message").innerText =
            "Invalid amount!";
    }
    else if (amount % 100 !== 0) {
        document.getElementById("message").innerText =
            "Withdraw amount should be multiple of 100!";
    }
    else if (amount > balance) {
        document.getElementById("message").innerText =
            "Insufficient balance!";
    }
    else {
        balance -= amount;
        document.getElementById("message").innerText =
            "Withdrawal successful!";
    }

    updateBalance();
}