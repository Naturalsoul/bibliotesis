let mongoose = require("mongoose")
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/bibliotesis");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));

db.once("open", function(callback){
    console.log("Connection Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

module.exports = mongoose