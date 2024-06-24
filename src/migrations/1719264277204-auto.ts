import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1719264277204 implements MigrationInterface {
    name = 'Auto1719264277204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'Todo', "description" character varying(255) NOT NULL, "estimated_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sheet_id" integer, CONSTRAINT "UQ_384311ad7530f0b06bcb9376591" UNIQUE ("name", "sheet_id"), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d" FOREIGN KEY ("sheet_id") REFERENCES "sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_62fc68fbedce9e0d5a5e1f5030d"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
