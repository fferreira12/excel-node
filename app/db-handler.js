var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//db connection
mongoose.connect('mongodb://localhost:27017/acc', { useMongoClient: true }, (err) => {
    if(err) throw err;
    console.log('mongodb connection successful');
});

module.exports = mongoose;
