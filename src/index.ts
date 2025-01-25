import express from "express";
import dotenv from "dotenv";
import { RequestContext } from "@mikro-orm/core";
import { initORM } from "./services/db.js";

dotenv.config();

async function bootstrap() {
  console.log("Starting server...");
  const app = express();
  const db = await initORM();
  const port = process.env.PORT || 3001;

  app.use((req, res, next) => {
    RequestContext.create(db.em, next);
  });

  process.on("exit", () => {
    db.orm.close();
  });

  app.get("/", (req, res) => {
    res.json({ message: "Dummy API Response" });
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap();
