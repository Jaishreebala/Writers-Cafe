const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const colors = require("colors");
const errorHandler = require("./middleware/error");

dotenv.config({ path: './config/config.env' });
const app = express();
app.use(express.json());
// Connect To Database
connectDB();

// Bring in writtenworks router
const writtenWorks = require('./router/writtenWorks')
app.use('/api/v1/writtenWork', writtenWorks);

// Call error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server up and running on port ${PORT}`.blue.bold));

process.on("unhandledRejection", (err, response) => {
    console.log(`Error: ${err}`.red.underline);
    server.close(() => {
        process.exit(1);
    })
})