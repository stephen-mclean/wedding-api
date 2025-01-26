import { Migration } from '@mikro-orm/migrations';

export class Migration20250126110845 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "guest" add column "is_plus_one" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "guest" drop column "is_plus_one";`);
  }

}
