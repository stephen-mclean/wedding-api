import { getServices } from "../../../services/db.js";
import { Guest } from "../guest.entity.js";
import { Invite } from "../invite.entity.js";
import { z } from "zod";

const guestSchema = z.object({
  name: z.string().min(1),
});

export const createInviteSchema = z.object({
  notes: z.string(),
  guests: z.array(guestSchema),
});

type CreateProps = z.infer<typeof createInviteSchema>;

function generateInviteCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

export async function create({ notes, guests }: CreateProps) {
  const services = getServices();

  if (!services) throw new Error("Database not initialized");

  const invite = new Invite();

  invite.notes = notes;
  invite.code = generateInviteCode();

  for (const guest of guests) {
    const g = new Guest();
    g.name = guest.name;
    g.invite = invite;
    services.em.persist(g);
  }

  services.em.persist(invite);

  await services.em.flush();

  return invite;
}
