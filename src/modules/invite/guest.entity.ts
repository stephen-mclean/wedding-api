import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Cascade,
} from "@mikro-orm/core";
import { Invite } from "./invite.entity.js";

@Entity()
export class Guest {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  name!: string;

  @Property({ nullable: true })
  isAttending!: boolean;

  @ManyToOne({ cascade: [Cascade.REMOVE] })
  invite!: Invite;
}
