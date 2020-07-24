const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const app = express();
const auth = require("./backend/api/routes/auth");
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.HOST,
  })
);

app.use("/auth", auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not found ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
