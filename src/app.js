const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));

app.use("/operations", require("./routes/operation.routes"));

app.get("/", (req, res) => {
  res.json({
    message: "API rodando",
  });
});

app.use(errorHandler);

module.exports = app;
