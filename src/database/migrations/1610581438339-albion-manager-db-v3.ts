import {MigrationInterface, QueryRunner} from "typeorm";

export class albionManagerDbV31610581438339 implements MigrationInterface {
    name = 'albionManagerDbV31610581438339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tier" integer NOT NULL, "est_value" integer NOT NULL, "construction_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "constructions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tier" integer NOT NULL, "est_earnings" integer NOT NULL, "construction_id" integer, CONSTRAINT "REL_a158caa233051285dbf04206ca" UNIQUE ("construction_id"), CONSTRAINT "PK_6f9140ade15430dea23f3d84a2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buildings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tier" integer NOT NULL, "daily_earnings" integer NOT NULL, "building_id" integer, "construction_id" integer, CONSTRAINT "REL_d8dcb07f79d35d03820e56074d" UNIQUE ("construction_id"), CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "islands" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "daily_earnings" integer NOT NULL, "active" boolean NOT NULL, "char_id" integer, CONSTRAINT "REL_aab82812d34c786b85f311cfed" UNIQUE ("char_id"), CONSTRAINT "PK_741cd0ddac7633cc4d63c71a9cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "char_id" integer, CONSTRAINT "PK_1a61056ec3c83295dd644dd97c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d59996da263304911f066afdb25" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "constructions" ADD CONSTRAINT "FK_a158caa233051285dbf04206ca8" FOREIGN KEY ("construction_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buildings" ADD CONSTRAINT "FK_bdcdadea4217a029b657c8f0523" FOREIGN KEY ("building_id") REFERENCES "islands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buildings" ADD CONSTRAINT "FK_d8dcb07f79d35d03820e56074dd" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "islands" ADD CONSTRAINT "FK_aab82812d34c786b85f311cfed2" FOREIGN KEY ("char_id") REFERENCES "chars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_5ab91556f6461d7dda1e27a3df7" FOREIGN KEY ("char_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_5ab91556f6461d7dda1e27a3df7"`);
        await queryRunner.query(`ALTER TABLE "islands" DROP CONSTRAINT "FK_aab82812d34c786b85f311cfed2"`);
        await queryRunner.query(`ALTER TABLE "buildings" DROP CONSTRAINT "FK_d8dcb07f79d35d03820e56074dd"`);
        await queryRunner.query(`ALTER TABLE "buildings" DROP CONSTRAINT "FK_bdcdadea4217a029b657c8f0523"`);
        await queryRunner.query(`ALTER TABLE "constructions" DROP CONSTRAINT "FK_a158caa233051285dbf04206ca8"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d59996da263304911f066afdb25"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "islands"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
        await queryRunner.query(`DROP TABLE "constructions"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
