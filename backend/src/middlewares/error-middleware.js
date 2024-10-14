import ResponseError from "../error/response-error.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ success: false, message: err.message }).end();
  } else {
    res
      .status(500)
      .json({
        success: false,
        message: err.message,
      })
      .end();
  }
};
