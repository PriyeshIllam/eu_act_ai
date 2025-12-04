import express from "express";
import cors from "cors";
import 'dotenv/config'; // load environment variables from .env
import chatWithGPTHandler from "./src/api/chatWithGPT.js";

const app = express();

// Allow requests from frontend
app.use(cors());
app.use(express.json());

// Route for your chat API
app.post("/api/chatWithGPT", chatWithGPTHandler);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
