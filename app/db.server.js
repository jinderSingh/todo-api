const mongoose = require("mongoose");

const connectToDb = (url, options = {}) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    ...options
  });
};

module.exports = connectToDb;
