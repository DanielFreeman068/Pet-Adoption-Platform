class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomerAPIError = (message, statusCode) => {
    return new createCustomerAPIError(message,statusCode);
}

module.exports = {createCustomerAPIError, CustomAPIError};