import {MigrationInterface, QueryRunner} from "typeorm";

export class albionManagerDb1608845408420 implements MigrationInterface {
    name = 'albionManagerDb1608845408420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "islands" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "daily_earnings" integer NOT NULL, "active" boolean NOT NULL, "island_id" integer, CONSTRAINT "REL_3b03ebd34fd6eb7a4e06aa4f98" UNIQUE ("island_id"), CONSTRAINT "PK_741cd0ddac7633cc4d63c71a9cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "island_id" integer, "char_id" integer, CONSTRAINT "REL_4318937258599c146d3dfa48f7" UNIQUE ("island_id"), CONSTRAINT "PK_1a61056ec3c83295dd644dd97c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "islands" ADD CONSTRAINT "FK_3b03ebd34fd6eb7a4e06aa4f98c" FOREIGN KEY ("island_id") REFERENCES "chars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_4318937258599c146d3dfa48f75" FOREIGN KEY ("island_id") REFERENCES "islands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_5ab91556f6461d7dda1e27a3df7" FOREIGN KEY ("char_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_5ab91556f6461d7dda1e27a3df7"`);
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_4318937258599c146d3dfa48f75"`);
        await queryRunner.query(`ALTER TABLE "islands" DROP CONSTRAINT "FK_3b03ebd34fd6eb7a4e06aa4f98c"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "islands"`);
    }

}
