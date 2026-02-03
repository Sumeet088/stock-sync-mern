const express = require("express");
const path = require("path");
const cors = require("cors");

const stockRoutes = require("./routes/stockRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/stock", stockRoutes);

// ✅ Serve frontend in production (Render-safe)
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(process.cwd(), "client", "dist");

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

module.exports = app;
