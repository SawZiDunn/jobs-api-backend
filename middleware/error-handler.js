const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal Server Error!",
        name: err.name,
    };

    if (err.code && err.code === 11000) {
        // convert an obj to an array
        customError.message = `Duplicate key error for ${
            Object.keys(err.keyValue)[0]
        }`;
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400
    }

    if (err.name === "ValidationError") {
        customError.message = `${Object.values(err.errors)
            .map((key) => key.message)
            .join(", ")}`;
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400
    }

    if (err.name === "CastError") {
        customError.message = "No item with this ID Number: " + err.value;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    res.status(customError.statusCode).json({
        err: customError,
    });
};

module.exports = errorHandlerMiddleware;
