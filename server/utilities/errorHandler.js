function errorHandler(err, req, res, next) {
  //console.log("error", err, req, res, next);
  // FIX: ERROR  UNIVERSAL

  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // TODO: 401 = Unauthorized client error
  if (err.name === "UnauthorizedError") {
    /// jwt auth error
    return res.status(401).json({ message: "The user is not authorized" });
  }

  if (err.name === "ValidationError") {
    /// validation error
    return res.status(401).json({ message: err });
  }

  // default to 500 server error
  // console.log(err.message);
  res.status(err.status || 500);
  return res.status(500).json({ message: "Internal server error" });
}

module.exports = errorHandler;
