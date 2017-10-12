//external requirements
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

//internal requirements
const fileHandler = require('./app/file-handler');
const transactionHandler = require('./app/transaction-handler');
const mongoose = require('./app/db-handler');
const Transaction = require('./app/models/transaction');
;
//runs the tool that converts excel to JSON
const result = excelToJson({
    sourceFile: './testsheets/acc.xlsx',
    header: {
        rows: 1
    },
    sheets: ['Currents'],
    columnToKey: {
        '*': '{{columnHeader}}'
    }
});

//gets the results from the currents tab
let currents = result.Currents;

let transactions = [];

//save transac tions to db
currents.forEach(function(t) {
    let transaction = new Transaction({
        orderID: t.ID,
        date: new Date((t.date - (25567 + 2))*86400*1000), //converts excel date to js date
        month: t.month,
        year: t.year,
        debitAccount: t.debitAccount,
        creditAccount: t.creditAccount,
        value: t.value,
        type: t.type,
        factType: t['fact type'],
        description: t.description
    });
    transactions.push(transaction);
    // transaction.save((err, trans) => {
    //     if(err) throw err;
    //     //console.log('saved to db');
    // });
}, this); 

Transaction.insertMany(transactions)
    .then((docs) => {
        console.log('sucess! ' + docs.length + ' transactions were inserted into db');
    })
    .catch((err) => {
        throw err;
    });

//console.log('all transactions saved to db');

//save file if it does not exists
// if(!fileHandler.FileExists('./testresults/transactions.json')) {
//     var json = JSON.stringify(currents);
//     fileHandler.SaveToDisk(json, './testresults/transactions.json', (err) => {
//         if(err) throw err;
//         console.log('done writing transactions file');
//     });
// }

//get incomplete transactions
let incompleteTransactions = transactionHandler.GetIncompleteTransactions(currents);
console.log(`Incomplete transactions: ${incompleteTransactions.length}`);
console.log(`Total transactions: ${currents.length}`);
console.log(`Percent Incomplete: ${(incompleteTransactions.length  * 100.0/ currents.length).toFixed(2)} %`)

//get balance for each account
let balances = transactionHandler.GetBalanceForAccounts(currents);
//console.log(balances);

//save balances if not exists
if(!fileHandler.FileExists('./testresults/balances.json')) {
    var json = JSON.stringify(balances);
    fileHandler.SaveToDisk(json, './testresults/balances.json', (err) => {
        if(err) throw err;
        console.log('done writing balances file');
    });
}

//verify if sum is zero
let sum = 0;
for(let acc in balances) {
    sum += balances[acc];
}

console.log('The sum of all accounts is ' + sum)



