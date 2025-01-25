import { Migration } from '@mikro-orm/migrations';

export class Migration20250125172723 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "guest" ("id" serial primary key, "name" varchar(100) not null, "is_attending" boolean not null, "invite_id" int not null);`);

    this.addSql(`alter table "guest" add constraint "guest_invite_id_foreign" foreign key ("invite_id") references "invite" ("id") on update cascade;`);

    this.addSql(`alter table "invite" add column "submit_count" int not null default 0, add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "guest" cascade;`);

    this.addSql(`alter table "invite" drop column "submit_count", drop column "created_at", drop column "updated_at";`);
  }

}
