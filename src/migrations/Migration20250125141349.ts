import { Migration } from '@mikro-orm/migrations';

export class Migration20250125141349 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "invite" ("id" serial primary key, "notes" varchar(1000) not null);`);
  }

}
