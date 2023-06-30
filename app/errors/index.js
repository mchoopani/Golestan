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

class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidArgumentError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

module.exports = Object.freeze({
    ValidationError,
    PermissionError,
    InvalidArgumentError,
    NotFoundError,
})