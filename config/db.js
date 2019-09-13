var mongoose = require('mongoose');

function initDb() {
    mongoose.connect(
        (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sauce" ),
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        function (error) {
            if (error) {
                console.log("Not connected to database ", error);
            } else {
                console.log("Successfully connected to database");
            }
        }
    )
}

module.exports = initDb;