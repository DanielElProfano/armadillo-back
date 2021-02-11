const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connect = () => {

  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Success connecteded to DB");
    })
    .catch((error) => {
      console.log("Error connecting to DB: ", error);
    });
}

module.exports = { DB_URL, connect };
