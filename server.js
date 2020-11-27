const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const path = require("path");
const cookieparser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });
const app = express();
// Body Parser
app.use(express.json());
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Use cookie parser
app.use(cookieparser());
// Connect To Database
connectDB();

// Bring in express file upload
app.use(fileupload());

// Bring in writtenworks router
const writtenWorks = require('./router/writtenWorks');
const auth = require('./router/auth');
const comments = require('./router/comments');
const users = require('./router/users');
app.use('/api/v1/writtenWork', writtenWorks);
app.use('/api/v1/auth', auth);
app.use('/api/v1/comments', comments);
app.use('/api/v1/users', users);

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