import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Agritrace Backend Running Successfully!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
