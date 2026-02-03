const express = require("express");
const path = require("path");
const cors = require("cors");

const stockRoutes = require("./routes/stockRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/stock", stockRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html")
  );
});

module.exports = app;
