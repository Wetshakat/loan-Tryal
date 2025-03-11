let Bank = {
    users: [],
    
    generateAccountNumber: function () {
        let accountNumber;
        do {
            accountNumber = "02" + Math.floor(10000000 + Math.random() * 10);
        } while (this.users.some(user => user.accountNumber === accountNumber));
        return accountNumber;
    },

    createAccount: function (firstName, lastName, age, phoneNumber) {
        if (age < 18) {
            alert("Too young to create an account.");
            return;
        }
        
        let accountNumber = this.generateAccountNumber();
        let newUser = {
            firstName,
            lastName,
            age,
            phoneNumber,
            accountBalance: 0,
            loanBalance: 0,
            accountNumber
        };

        this.users.push(newUser);
        this.updateUsersList();
        alert(`Account created! Account Number: ${accountNumber}`);
    },

    findUser: function (accountNumber) {
        return this.users.find(user => user.accountNumber === accountNumber);
    },

    deposit: function (accountNumber, amount) {
        let user = this.findUser(accountNumber);
        if (!user) return alert("Account not found.");
        if (amount <= 0) return alert("Deposit amount must be greater than zero.");

        user.accountBalance += amount;
        alert(`Deposited ${amount}. New Balance: ${user.accountBalance}`);
    },

    requestLoan: function (accountNumber, amount) {
        let user = this.findUser(accountNumber);
        if (!user) return alert("Account not found.");
        if (amount <= 0) return alert("Invalid loan amount.");
        
        user.accountBalance += amount;
        user.loanBalance += amount;
        alert(`Loan approved! ${amount} added to your account.`);
    },

    repayLoan: function (accountNumber, amount) {
        let user = this.findUser(accountNumber);
        if (!user) return alert("Account not found.");
        if (amount <= 0) return alert("Invalid repayment amount.");
        if (amount > user.accountBalance) return alert("Insufficient balance.");
        if (amount > user.loanBalance) return alert("Repayment exceeds loan balance.");
        
        user.loanBalance -= amount;
        user.accountBalance -= amount;
        alert(`Loan repaid! Remaining loan balance: ${user.loanBalance}`);
    },

    updateUsersList: function () {
        let usersList = document.getElementById("usersList");
        usersList.innerHTML = "";
        this.users.forEach(user => {
            let li = document.createElement("li");
            li.textContent = `${user.firstName} ${user.lastName} - Account: ${user.accountNumber} - Balance: ${user.accountBalance}`;
            usersList.appendChild(li);
        });
    }
};

function createAccount() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = parseInt(document.getElementById("age").value);
    let phoneNumber = document.getElementById("phoneNumber").value;
    
    Bank.createAccount(firstName, lastName, age, phoneNumber);
}

function depositMoney() {
    let accountNumber = document.getElementById("accountNumber").value;
    let amount = parseFloat(document.getElementById("amount").value);
    
    Bank.deposit(accountNumber, amount);
    Bank.updateUsersList();
}

function requestLoan() {
    let accountNumber = document.getElementById("accountNumber").value;
    let amount = parseFloat(document.getElementById("amount").value);
    
    Bank.requestLoan(accountNumber, amount);
    Bank.updateUsersList();
}

function repayLoan() {
    let accountNumber = document.getElementById("accountNumber").value;
    let amount = parseFloat(document.getElementById("amount").value);
    
    Bank.repayLoan(accountNumber, amount);
    Bank.updateUsersList();
}
