class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
}

class PermissionError extends Error {
    constructor(message) {
      super(message);
      this.name = "PermissionError";
    }
}

module.exports = Object.freeze({
    ValidationError,
    PermissionError
})