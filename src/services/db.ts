import { EntityManager, MikroORM } from "@mikro-orm/postgresql";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
}

let cache: Services | null = null;

export async function initORM() {
  if (cache) return cache;

  const orm = await MikroORM.init();

  return (cache = {
    orm,
    em: orm.em,
  });
}

export function getServices() {
  return cache;
}
