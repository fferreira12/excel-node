function GetIncompleteTransactions(transactions) {
    return transactions.filter((element) => {
        return (!element.debitAccount || !element.creditAccount)
    });
}

//values are stored in cents
function GetBalanceForAccounts(transactions) {
    let result = {};

    transactions.forEach(function(element) {
        //if element has a debit account
        if(element.debitAccount) {
            if(result[element.debitAccount]) {
                result[element.debitAccount] -= Math.round(element.value);
            } else {
                result[element.debitAccount] = 0 - Math.round(element.value);
            }
        }

        //if element has a credit account
        if(element.creditAccount) {
            if(result[element.creditAccount]) {
                result[element.creditAccount] += Math.round(element.value);
            } else {
                result[element.creditAccount] = Math.round(element.value);
            }
        }
    }, this);

    return result;
}

module.exports.GetIncompleteTransactions = GetIncompleteTransactions;
module.exports.GetBalanceForAccounts = GetBalanceForAccounts;