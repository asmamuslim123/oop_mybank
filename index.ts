#! /usr/bin/env node
import inquirer from "inquirer";
// Bank Account interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void
  deposit(amount: number): void
  checkBalance(): void
};

// Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;
    
    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        } else {
            console.log("Insufficient balance.");
        }
    }; 
    // Credit money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; //$1 fee charged if more then $100 is deposited 
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
}
    // Check balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
}
};

// Customer class
class customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank  account
let accounts: BankAccount[] = [
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000),
    new BankAccount(1003, 3000) 
];

// Create customers
let customers: customer[] = [
    new customer("Ayaan", "Rashid", "Male", 25, 9876543210, accounts[0]),
    new customer("Rayaan", "Khan", "Male", 30, 9876543211, accounts[1]),
    new customer("Asma", "Muslim", "Female", 28, 9876543212, accounts[2])
]

// Function to interact with bank account
async function service(){
        do{
            let accountNumberinput = await inquirer .prompt({
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            });
            let customer = customers.find(customer => customer.account.accountNumber  === accountNumberinput.accountNumber);
            if(customer){ 
                console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`);
                let ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: [
                        { name: "Deposit", value: "Deposit" },
                        { name: "Withdraw", value: "Withdraw" },
                        { name: "Check Balance", value: "Check Balance" },
                        { name: "Exit", value: "Exit" }
                      ],
                }]);
                switch(ans.select){
                    case "Deposit":
                        let depositAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        });
                        customer.account.deposit(depositAmount.amount);  
                        break;

                        case "Withdraw":
                        let withdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        });
                        customer.account.withdraw(withdrawAmount.amount);
                        break;

                        case "Check Balance":
                        customer.account.checkBalance();
                        break;
                        case "Exit":
                        console.log("Exiting bank program....");
                        console.log("\n Thank you for using our services. Goodbye!");
                        return;  
                    }
            }else{
                console.log("Invalid account number. Please try again.");                
            }  
        } while(true)
    }
    service();