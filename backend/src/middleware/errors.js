function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid resource identifier." });
  }
  if (error.code === 11000) {
    return res.status(409).json({ error: "A record with that value already exists." });
  }
  if (error.name === "MulterError") {
    const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: error.message });
  }

  console.error("Request failed:", error);
  res.status(error.statusCode || 500).json({
    error: error.statusCode ? error.message : "An unexpected server error occurred.",
  });
}

module.exports = { notFound, errorHandler };
