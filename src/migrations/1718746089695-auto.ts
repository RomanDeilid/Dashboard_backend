import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1718746089695 implements MigrationInterface {
    name = 'Auto1718746089695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Todo', 'In progress', 'In review', 'Done')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'Todo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" character varying(16) NOT NULL`);
    }

}
