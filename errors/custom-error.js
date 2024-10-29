class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomAPIError = (message, statusCode) => {
    return new createCustomAPIError(message,statusCode);
}

module.exports = {createCustomAPIError, CustomAPIError};