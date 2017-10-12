var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    orderID: Number,
    date: Date,
    month: Number,
    year: Number,
    debitAccount: String,
    creditAccount: String,
    value: Number,
    type: String,
    factType: String,
    description: String
  }
); 

var Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;