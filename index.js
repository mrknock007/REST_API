const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/First_Project')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error", err));

// Middleware
app.use((req, res, next) => {
  console.log("hello from middleware 1");
  next();
});


app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
