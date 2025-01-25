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
import { get } from "./modules/invite/commands/get.js";
import { list } from "./modules/invite/commands/list.js";
import { deleteInvite } from "./modules/invite/commands/delete.js";

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
    try {
      const body = createInviteSchema.parse(req.body);
      const invite = await create(body);
      res.json(invite);
    } catch {
      res.status(400).json({ error: "Failed to create invite" });
    }
  });

  app.put("/invite/:id", async (req, res) => {
    try {
      const body = updateInviteSchema.parse(req.body);
      const invite = await update(body);
      res.json(invite);
    } catch {
      res.status(400).json({ error: "Failed to update invite" });
    }
  });

  app.get("/invite/:code", async (req, res) => {
    try {
      const invite = await get(req.params.code);
      res.json(invite);
    } catch {
      res.status(404).json({ error: "Invite not found" });
    }
  });

  app.get("/invites", async (req, res) => {
    try {
      const invites = await list();
      res.json(invites);
    } catch {
      res.status(400).json({ error: "Failed to list invites" });
    }
  });

  app.delete("/invite/:id", async (req, res) => {
    try {
      await deleteInvite(Number(req.params.id));
      res.json({ message: "Invite deleted" });
    } catch {
      res.status(400).json({ error: "Failed to delete invite" });
    }
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap();
