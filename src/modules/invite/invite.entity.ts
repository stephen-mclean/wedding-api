import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Invite {
  @PrimaryKey()
  id!: number;

  @Property({ length: 1000 })
  notes!: string;
}
