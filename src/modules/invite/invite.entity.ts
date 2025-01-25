import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { Guest } from "./guest.entity.js";

@Entity()
export class Invite {
  @PrimaryKey()
  id!: number;

  @Property({ length: 1000 })
  notes!: string;

  @Property({ default: 0 })
  submitCount!: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @OneToMany("Guest", "invite")
  guests = new Collection<Guest>(this);

  @Property({ length: 10 })
  code!: string;
}
