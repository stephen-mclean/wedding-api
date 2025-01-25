import { Invite } from "../invite.entity.js";
import { getServices } from "../../../services/db.js";

export async function deleteInvite(id: number) {
  const services = getServices();

  if (!services) throw new Error("Database not initialized");

  const invite = services.em.getReference(Invite, id);

  if (!invite) throw new Error("Invite not found");

  await services.em.remove(invite).flush();
}
