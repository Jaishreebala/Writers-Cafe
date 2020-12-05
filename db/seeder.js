const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Writtenwork = require("./models/Writtenwork");
dotenv.config({ path: './config/config.env' })

connectDB();

const writtenWorks = JSON.parse(fs.readFileSync(`${__dirname}/_data/writtenWorks.json`, 'utf-8'));

const importData = async () => {
    try {
        await Writtenwork.create(writtenWorks);
        console.log("Data Successfully Imported".green.inverse);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await Writtenwork.deleteMany();
        console.log("Data Successfully Deleted".red.inverse);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === "-i")
    importData()
if (process.argv[2] === "-d")
    deleteData()