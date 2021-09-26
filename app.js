const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const pdfRoutes = require("./routes/pdf");
const authRoutes = require("./routes/auth");
const makePDF = require("./makePDF");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/pdf", pdfRoutes);

app.use((req, res, next) => {
  res.status(404).send({ message: "no page found" });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set("useUnifiedTopology", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/html2pdf", { useNewUrlParser: true })
  .then((result) => {
    app.listen(4000);
    console.log("listening on port 4000");
  })
  .catch((error) => console.log(error));
