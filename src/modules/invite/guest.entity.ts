import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Invite } from "./invite.entity.js";

@Entity()
export class Guest {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  name!: string;

  @Property()
  isAttending!: boolean;

  @ManyToOne()
  invite!: Invite;
}
