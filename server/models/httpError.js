class HttpError extends Error {
  constructor(message, errorCode) {
    // constructor for the HttpError class
    super(message); // call the constructor of the Error class to set the message property
    this.code = errorCode; // add a code property to the HttpError class
  }
}

module.exports = HttpError;
