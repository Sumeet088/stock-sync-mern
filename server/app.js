const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const stockRoutes = require("./routes/stockRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/stock", stockRoutes);

// ✅ Serve frontend ONLY if build exists
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(process.cwd(), "client", "dist");

  if (fs.existsSync(clientPath)) {
    app.use(express.static(clientPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(clientPath, "index.html"));
    });
  } else {
    console.warn("⚠️ client/dist not found. Frontend not built yet.");
  }
}

module.exports = app;
