const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: './config/config.env' });

const app = express();
// Bring in writtenworks router

const writtenWorks = require('./router/writtenWorks')
app.use('/api/v1/writtenWork', writtenWorks);



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server up and running on port ${PORT}`));