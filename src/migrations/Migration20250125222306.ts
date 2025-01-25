import { Migration } from '@mikro-orm/migrations';

export class Migration20250125222306 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "guest" drop constraint "guest_invite_id_foreign";`);

    this.addSql(`alter table "guest" alter column "invite_id" type int using ("invite_id"::int);`);
    this.addSql(`alter table "guest" alter column "invite_id" drop not null;`);
    this.addSql(`alter table "guest" add constraint "guest_invite_id_foreign" foreign key ("invite_id") references "invite" ("id") on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "guest" drop constraint "guest_invite_id_foreign";`);

    this.addSql(`alter table "guest" alter column "invite_id" type int using ("invite_id"::int);`);
    this.addSql(`alter table "guest" alter column "invite_id" set not null;`);
    this.addSql(`alter table "guest" add constraint "guest_invite_id_foreign" foreign key ("invite_id") references "invite" ("id") on update cascade;`);
  }

}
