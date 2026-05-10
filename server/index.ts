import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // JSON parser middleware
  app.use(express.json());

  // CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // ADSB.lol proxy endpoint
  app.get("/api/aircraft/adsb-lol", async (req, res) => {
    try {
      const response = await axios.get("https://api.adsb.lol/api/0/receiver", {
        timeout: 10000,
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("ADSB.lol proxy error:", error.message);
      res.status(500).json({
        error: "Failed to fetch ADSB.lol data",
        message: error.message,
      });
    }
  });

  // ADSBExchange proxy endpoint
  app.get("/api/aircraft/adsbexchange", async (req, res) => {
    try {
      const params: Record<string, any> = {};

      // Query parameters
      if (req.query.lamin) params.lamin = req.query.lamin;
      if (req.query.lamax) params.lamax = req.query.lamax;
      if (req.query.lomin) params.lomin = req.query.lomin;
      if (req.query.lomax) params.lomax = req.query.lomax;

      const response = await axios.get("https://api.adsbexchange.com/v2/json", {
        params,
        timeout: 10000,
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("ADSBExchange proxy error:", error.message);
      res.status(500).json({
        error: "Failed to fetch ADSBExchange data",
        message: error.message,
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
