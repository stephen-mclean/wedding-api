import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.json({ message: "Dummy API Response" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
