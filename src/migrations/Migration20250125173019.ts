import { Migration } from '@mikro-orm/migrations';

export class Migration20250125173019 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "invite" add column "code" varchar(10) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "invite" drop column "code";`);
  }

}
