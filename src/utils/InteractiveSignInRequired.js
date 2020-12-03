function InteractiveSignInRequired(message) {
  this.message = message;
  // Use V8's native method if available, otherwise fallback
  if ("captureStackTrace" in Error) {
    Error.captureStackTrace(this, InteractiveSignInRequired);
  } else {
    this.stack = new Error().stack;
  }
}

InteractiveSignInRequired.prototype = Object.create(Error.prototype);
InteractiveSignInRequired.prototype.name = "InteractiveSignInRequired";
InteractiveSignInRequired.prototype.constructor = InteractiveSignInRequired;

export default InteractiveSignInRequired;
