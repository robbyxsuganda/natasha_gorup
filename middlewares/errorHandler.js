const errorHandler = (error, req, res, next) => {
  let message = "Internal server error";
  let status = 500;

  console.log(error, "Error Handler");

  if (error.name === "SequelizeValidationError") {
    message = error.errors[0].message;
    status = 400;
  }

  if (error.name == "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    message = "Invalid data input";
    status = 400;
  }

  if (error.name === "NotFound") {
    message = "Data not found!";
    status = 404;
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
