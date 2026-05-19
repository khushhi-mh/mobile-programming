let balance = 10000;
let pin = "7539";

let visible = false;

function checkPin() {
    let enteredPin = prompt("Enter PIN:");
    if (enteredPin === pin) {
        return true;
    }
    else {
        alert("Wrong PIN!");
        return false;
    }
}

function eye() {
    if (visible === false) {
        document.getElementById("balanceText").innerText = "Balance: Rs. " + balance;
        document.getElementById("eyeIcon").className = "fa-solid fa-eye";
        visible = true;
    }
    else {
        document.getElementById("balanceText").innerText = "Balance: Rs. ******";
        document.getElementById("eyeIcon").className = "fa-solid fa-eye-slash";
        visible = false;
    }
}

function updateBalance() {
    if (visible === true) {
        document.getElementById("balanceText").innerText = "Balance: Rs. " + balance;
    }
}

function showInput(action) {

    if (!checkPin()) return;
        document.getElementById("amountSection").style.display = "block";

    if (action === "deposit") {
        deposit();
    }
    else {
        withdraw();
    }
}

function deposit() {

    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
        document.getElementById("message").innerText = "Invalid amount!";
    }
    else if (amount % 100 !== 0) {
        document.getElementById("message").innerText = "Deposit amount should be multiple of 100!";
    }
    else {
        balance += amount;
        document.getElementById("message").innerText = "Deposit successful!";
    }

    updateBalance();
}

function withdraw() {

    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
        document.getElementById("message").innerText = "Invalid amount!";
    }
    else if (amount % 100 !== 0) {
        document.getElementById("message").innerText = "Withdraw amount should be multiple of 100!";
    }
    else if (amount > balance) {
        document.getElementById("message").innerText = "Insufficient balance!";
    }
    else {
        balance -= amount;
        document.getElementById("message").innerText = "Withdrawal successful!";
    }

    updateBalance();
}