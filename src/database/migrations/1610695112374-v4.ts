import {MigrationInterface, QueryRunner} from "typeorm";

export class v41610695112374 implements MigrationInterface {
    name = 'v41610695112374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "island_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_57f6f67b1462279cdde275683d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "building_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7fe9b63a2e5a344c346511dc198" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "daily_costs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "island_id" integer, "product_id" integer, CONSTRAINT "PK_9a33a1cb9064d20f07662c3ba31" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "est_value" integer NOT NULL, "tier" integer NOT NULL, "construction_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "constructions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tier" integer NOT NULL, "building_id" integer, "islandId" integer, CONSTRAINT "PK_6f9140ade15430dea23f3d84a2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "daily_earnings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "construction_id" integer, "island_id" integer, CONSTRAINT "PK_12eea5ffa017467df2008856709" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "islands" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "active" boolean NOT NULL, "island_type_id" integer, "island_location_id" integer, "char_id" integer, CONSTRAINT "REL_aab82812d34c786b85f311cfed" UNIQUE ("char_id"), CONSTRAINT "PK_741cd0ddac7633cc4d63c71a9cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "account_id" integer, CONSTRAINT "PK_1a61056ec3c83295dd644dd97c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "daily_costs" ADD CONSTRAINT "FK_bdf4c52952d8a1af4e183775e43" FOREIGN KEY ("island_id") REFERENCES "islands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_costs" ADD CONSTRAINT "FK_150b4b20711412bfb2c11330b03" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d59996da263304911f066afdb25" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "constructions" ADD CONSTRAINT "FK_21859d098b2a1a5f9d1a52af06f" FOREIGN KEY ("building_id") REFERENCES "building_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "constructions" ADD CONSTRAINT "FK_ca22a128b02c4fa3e4d34fc7b15" FOREIGN KEY ("islandId") REFERENCES "islands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_earnings" ADD CONSTRAINT "FK_638199c37942af0cf66e503f165" FOREIGN KEY ("construction_id") REFERENCES "constructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_earnings" ADD CONSTRAINT "FK_98d1be2e24c7d3633036209f38c" FOREIGN KEY ("island_id") REFERENCES "islands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "islands" ADD CONSTRAINT "FK_4e929c20ddcfaa145fe46fc0e01" FOREIGN KEY ("island_type_id") REFERENCES "island_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "islands" ADD CONSTRAINT "FK_d124e9d1ed3e5a8adbc77a64831" FOREIGN KEY ("island_location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "islands" ADD CONSTRAINT "FK_aab82812d34c786b85f311cfed2" FOREIGN KEY ("char_id") REFERENCES "chars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_d1a0a33a6306447b3744000909c" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`);
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_d1a0a33a6306447b3744000909c"`);
        await queryRunner.query(`ALTER TABLE "islands" DROP CONSTRAINT "FK_aab82812d34c786b85f311cfed2"`);
        await queryRunner.query(`ALTER TABLE "islands" DROP CONSTRAINT "FK_d124e9d1ed3e5a8adbc77a64831"`);
        await queryRunner.query(`ALTER TABLE "islands" DROP CONSTRAINT "FK_4e929c20ddcfaa145fe46fc0e01"`);
        await queryRunner.query(`ALTER TABLE "daily_earnings" DROP CONSTRAINT "FK_98d1be2e24c7d3633036209f38c"`);
        await queryRunner.query(`ALTER TABLE "daily_earnings" DROP CONSTRAINT "FK_638199c37942af0cf66e503f165"`);
        await queryRunner.query(`ALTER TABLE "constructions" DROP CONSTRAINT "FK_ca22a128b02c4fa3e4d34fc7b15"`);
        await queryRunner.query(`ALTER TABLE "constructions" DROP CONSTRAINT "FK_21859d098b2a1a5f9d1a52af06f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d59996da263304911f066afdb25"`);
        await queryRunner.query(`ALTER TABLE "daily_costs" DROP CONSTRAINT "FK_150b4b20711412bfb2c11330b03"`);
        await queryRunner.query(`ALTER TABLE "daily_costs" DROP CONSTRAINT "FK_bdf4c52952d8a1af4e183775e43"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "islands"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "daily_earnings"`);
        await queryRunner.query(`DROP TABLE "constructions"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "daily_costs"`);
        await queryRunner.query(`DROP TABLE "building_types"`);
        await queryRunner.query(`DROP TABLE "island_types"`);
    }

}
