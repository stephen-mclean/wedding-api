import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { RequestContext } from "@mikro-orm/core";
import { initORM } from "./services/db.js";

import {
  createInviteSchema,
  create,
} from "./modules/invite/commands/create.js";
import {
  updateInviteSchema,
  update,
} from "./modules/invite/commands/update.js";

dotenv.config();

async function bootstrap() {
  console.log("Starting server...");
  const app = express();
  const db = await initORM();
  const port = process.env.PORT || 3001;

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    RequestContext.create(db.em, next);
  });

  process.on("exit", () => {
    db.orm.close();
  });

  app.get("/", (req, res) => {
    res.json({ message: "Dummy API Response" });
  });

  app.post("/invite", async (req, res) => {
    const body = createInviteSchema.parse(req.body);
    const invite = await create(body);
    res.json(invite);
  });

  app.put("/invite/:id", async (req, res) => {
    const body = updateInviteSchema.parse(req.body);
    const invite = await update(body);
    res.json(invite);
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap();
