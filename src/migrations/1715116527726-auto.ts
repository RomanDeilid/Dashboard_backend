import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1715116527726 implements MigrationInterface {
  name = 'Auto1715116527726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sheet" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "UQ_649d5d0421ff5baead252c0d2e6" UNIQUE ("name", "company_id"), CONSTRAINT "PK_dad09477f092119a15d46ee598e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "status" character varying(16) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sheet_id" integer, CONSTRAINT "UQ_384311ad7530f0b06bcb9376591" UNIQUE ("name", "sheet_id"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(16) NOT NULL, "password" character varying(16) NOT NULL, "role" character varying(5) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_company_company" ("userId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_020a9c03c8b4e74bc44e8e02fc2" PRIMARY KEY ("userId", "companyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95b20ffec4f67d9d298e2fb9e3" ON "user_company_company" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d49f8a60809a0797c964ec594" ON "user_company_company" ("companyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "sheet" ADD CONSTRAINT "FK_b1c86675a7ebae793fe9273901d" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d" FOREIGN KEY ("sheet_id") REFERENCES "sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_company" ADD CONSTRAINT "FK_95b20ffec4f67d9d298e2fb9e35" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_company" ADD CONSTRAINT "FK_7d49f8a60809a0797c964ec594c" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_company_company" DROP CONSTRAINT "FK_7d49f8a60809a0797c964ec594c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_company" DROP CONSTRAINT "FK_95b20ffec4f67d9d298e2fb9e35"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sheet" DROP CONSTRAINT "FK_b1c86675a7ebae793fe9273901d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d49f8a60809a0797c964ec594"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95b20ffec4f67d9d298e2fb9e3"`,
    );
    await queryRunner.query(`DROP TABLE "user_company_company"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "sheet"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
