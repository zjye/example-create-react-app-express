const express = require("express");
const winston = require("winston");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/logger", (req, res, next) => {
  if (req.body) {
    logger.log(
      req.body.level.toLowerCase() || "error",
      req.body.message,
      req.body
    );
  }
  return res.send("OK");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
