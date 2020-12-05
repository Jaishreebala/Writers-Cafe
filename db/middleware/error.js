const errorReponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad object ID
    if (err.name == "CastError") {
        const message = `Written work not found with the ID of ${error.value}`;
        error = new errorReponse(message, 404);
    }
    if (err.code == 11000) {
        const message = `Duplicate key value entered: ${err.keyValue._id}`;
        error = new errorReponse(message, 400);
    }
    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new errorReponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;