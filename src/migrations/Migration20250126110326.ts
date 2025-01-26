import { Migration } from '@mikro-orm/migrations';

export class Migration20250126110326 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "guest" alter column "is_attending" type boolean using ("is_attending"::boolean);`);
    this.addSql(`alter table "guest" alter column "is_attending" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "guest" alter column "is_attending" type boolean using ("is_attending"::boolean);`);
    this.addSql(`alter table "guest" alter column "is_attending" set not null;`);
  }

}
