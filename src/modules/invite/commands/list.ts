import { Invite } from "../invite.entity.js";
import { getServices } from "../../../services/db.js";

export async function list() {
  const services = getServices();

  if (!services) throw new Error("Database not initialized");

  const invites = await services.em.find(Invite, {}, { populate: ["guests"] });

  return invites;
}
