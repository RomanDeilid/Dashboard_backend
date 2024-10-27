import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1727047652631 implements MigrationInterface {
    name = 'Auto1727047652631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(16) NOT NULL, "password" character varying(256) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'User', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sheet" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "status" "public"."sheet_status_enum" NOT NULL DEFAULT 'Todo', "description" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "UQ_649d5d0421ff5baead252c0d2e6" UNIQUE ("name", "company_id"), CONSTRAINT "PK_dad09477f092119a15d46ee598e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'Todo', "description" character varying(255) NOT NULL, "estimated_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sheet_id" integer, CONSTRAINT "UQ_384311ad7530f0b06bcb9376591" UNIQUE ("name", "sheet_id"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_companies_company" ("userId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_4d806db0eeeaa54b2bff6335549" PRIMARY KEY ("userId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11ac2b5cec7baf03fc36120011" ON "user_companies_company" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3faa3b15b4ac404e4e5aaebe8d" ON "user_companies_company" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "sheet" ADD CONSTRAINT "FK_b1c86675a7ebae793fe9273901d" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d" FOREIGN KEY ("sheet_id") REFERENCES "sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_companies_company" ADD CONSTRAINT "FK_11ac2b5cec7baf03fc361200111" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_companies_company" ADD CONSTRAINT "FK_3faa3b15b4ac404e4e5aaebe8df" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_companies_company" DROP CONSTRAINT "FK_3faa3b15b4ac404e4e5aaebe8df"`);
        await queryRunner.query(`ALTER TABLE "user_companies_company" DROP CONSTRAINT "FK_11ac2b5cec7baf03fc361200111"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d"`);
        await queryRunner.query(`ALTER TABLE "sheet" DROP CONSTRAINT "FK_b1c86675a7ebae793fe9273901d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3faa3b15b4ac404e4e5aaebe8d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11ac2b5cec7baf03fc36120011"`);
        await queryRunner.query(`DROP TABLE "user_companies_company"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "sheet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
