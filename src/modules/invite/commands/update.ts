import { z } from "zod";
import { wrap } from "@mikro-orm/core";
import { getServices } from "../../../services/db.js";

import { Guest } from "../guest.entity.js";
import { Invite } from "../invite.entity.js";

const guestSchema = z.object({
  id: z.number(),
  isAttending: z.boolean().optional(),
  isPlusOne: z.boolean().optional(),
  name: z.string().optional(),
});

export const updateInviteSchema = z.object({
  id: z.number(),
  notes: z.string(),
  guests: z.array(guestSchema),
});

type UpdateProps = z.infer<typeof updateInviteSchema>;

export async function update({ id, notes, guests }: UpdateProps) {
  const services = getServices();

  if (!services) throw new Error("Database not initialized");

  const invite = await services.em.findOne(
    Invite,
    { id },
    { populate: ["guests"] },
  );

  if (!invite) throw new Error("Invite not found");

  wrap(invite).assign({ notes, submitCount: invite.submitCount + 1 });

  for (const guest of guests) {
    const g = await services.em.findOne(Guest, { id: guest.id });
    if (!g) throw new Error("Guest not found");
    wrap(g).assign({
      isAttending: guest.isAttending,
      isPlusOne: guest.isPlusOne,
      name: guest.name,
    });
  }

  await services.em.flush();

  return invite;
}
