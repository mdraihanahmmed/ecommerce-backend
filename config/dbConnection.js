const mongoose = require("mongoose");
//123ecommerce123
function dbConnection() {
  mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("db ready");
  });
}

module.exports = dbConnection;
