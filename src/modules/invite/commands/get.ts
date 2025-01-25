import { Invite } from "../invite.entity.js";
import { getServices } from "../../../services/db.js";

export async function get(code: string) {
  const services = getServices();

  if (!services) throw new Error("Database not initialized");

  const invite = await services.em.findOne(
    Invite,
    { code },
    { populate: ["guests"] },
  );

  if (!invite) throw new Error("Invite not found");

  return invite;
}
