const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.DB_URI) {
        throw new Error("There is no DB_URI in env.");
    };

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Connected...");
    } catch (err) {
        console.error("Database Error: ", err.message)
    };
};

module.exports = connectDB;