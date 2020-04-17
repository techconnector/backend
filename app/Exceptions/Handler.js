"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    const errors = {};

    // Change the errors response
    switch (error.name) {
      case "ValidationException":
        error.messages.forEach((error) => {
          if (!errors[error.field]) {
            errors[error.field] = error.message;
          }
        });
        return response.status(error.status).send(errors);
      case "UserNotFoundException":
      case "PasswordMisMatchException":
        errors["global"] = "Invalid credentials";
        return response.status(error.status).send(errors);
    }

    return super.handle(...arguments);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
