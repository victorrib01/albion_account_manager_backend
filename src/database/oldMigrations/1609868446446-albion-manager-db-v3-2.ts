import {MigrationInterface, QueryRunner} from "typeorm";

export class albionManagerDbV321609868446446 implements MigrationInterface {
    name = 'albionManagerDbV321609868446446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "daily_earnings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "value" integer NOT NULL, "construction_id" integer, "island_id" integer)`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "est_value" integer NOT NULL, "tier" integer NOT NULL, "construction_id" integer)`);
        await queryRunner.query(`CREATE TABLE "constructions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tier" integer NOT NULL, "building_id" integer)`);
        await queryRunner.query(`CREATE TABLE "buildings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "islandId" integer)`);
        await queryRunner.query(`CREATE TABLE "island_types" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "islands" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "active" boolean NOT NULL, "island_type_id" integer, "char_id" integer, CONSTRAINT "REL_aab82812d34c786b85f311cfed" UNIQUE ("char_id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "account_id" integer)`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_daily_earnings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "value" integer NOT NULL, "construction_id" integer, "island_id" integer, CONSTRAINT "FK_638199c37942af0cf66e503f165" FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_98d1be2e24c7d3633036209f38c" FOREIGN KEY ("island_id") REFERENCES "islands" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_daily_earnings"("id", "created_at", "value", "construction_id", "island_id") SELECT "id", "created_at", "value", "construction_id", "island_id" FROM "daily_earnings"`);
        await queryRunner.query(`DROP TABLE "daily_earnings"`);
        await queryRunner.query(`ALTER TABLE "temporary_daily_earnings" RENAME TO "daily_earnings"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "est_value" integer NOT NULL, "tier" integer NOT NULL, "construction_id" integer, CONSTRAINT "FK_d59996da263304911f066afdb25" FOREIGN KEY ("construction_id") REFERENCES "constructions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "est_value", "tier", "construction_id") SELECT "id", "name", "est_value", "tier", "construction_id" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
        await queryRunner.query(`CREATE TABLE "temporary_constructions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tier" integer NOT NULL, "building_id" integer, CONSTRAINT "FK_21859d098b2a1a5f9d1a52af06f" FOREIGN KEY ("building_id") REFERENCES "buildings" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_constructions"("id", "name", "tier", "building_id") SELECT "id", "name", "tier", "building_id" FROM "constructions"`);
        await queryRunner.query(`DROP TABLE "constructions"`);
        await queryRunner.query(`ALTER TABLE "temporary_constructions" RENAME TO "constructions"`);
        await queryRunner.query(`CREATE TABLE "temporary_buildings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "islandId" integer, CONSTRAINT "FK_a2d28574e99b29961571558fbaf" FOREIGN KEY ("islandId") REFERENCES "islands" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_buildings"("id", "name", "islandId") SELECT "id", "name", "islandId" FROM "buildings"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
        await queryRunner.query(`ALTER TABLE "temporary_buildings" RENAME TO "buildings"`);
        await queryRunner.query(`CREATE TABLE "temporary_islands" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "active" boolean NOT NULL, "island_type_id" integer, "char_id" integer, CONSTRAINT "REL_aab82812d34c786b85f311cfed" UNIQUE ("char_id"), CONSTRAINT "FK_4e929c20ddcfaa145fe46fc0e01" FOREIGN KEY ("island_type_id") REFERENCES "island_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_aab82812d34c786b85f311cfed2" FOREIGN KEY ("char_id") REFERENCES "chars" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_islands"("id", "level", "active", "island_type_id", "char_id") SELECT "id", "level", "active", "island_type_id", "char_id" FROM "islands"`);
        await queryRunner.query(`DROP TABLE "islands"`);
        await queryRunner.query(`ALTER TABLE "temporary_islands" RENAME TO "islands"`);
        await queryRunner.query(`CREATE TABLE "temporary_chars" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "account_id" integer, CONSTRAINT "FK_d1a0a33a6306447b3744000909c" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_chars"("id", "nickname", "premium", "first_premium", "silver", "account_id") SELECT "id", "nickname", "premium", "first_premium", "silver", "account_id" FROM "chars"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`ALTER TABLE "temporary_chars" RENAME TO "chars"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" RENAME TO "temporary_chars"`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nickname" varchar NOT NULL, "premium" boolean NOT NULL, "first_premium" boolean NOT NULL, "silver" integer NOT NULL, "account_id" integer)`);
        await queryRunner.query(`INSERT INTO "chars"("id", "nickname", "premium", "first_premium", "silver", "account_id") SELECT "id", "nickname", "premium", "first_premium", "silver", "account_id" FROM "temporary_chars"`);
        await queryRunner.query(`DROP TABLE "temporary_chars"`);
        await queryRunner.query(`ALTER TABLE "islands" RENAME TO "temporary_islands"`);
        await queryRunner.query(`CREATE TABLE "islands" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "active" boolean NOT NULL, "island_type_id" integer, "char_id" integer, CONSTRAINT "REL_aab82812d34c786b85f311cfed" UNIQUE ("char_id"))`);
        await queryRunner.query(`INSERT INTO "islands"("id", "level", "active", "island_type_id", "char_id") SELECT "id", "level", "active", "island_type_id", "char_id" FROM "temporary_islands"`);
        await queryRunner.query(`DROP TABLE "temporary_islands"`);
        await queryRunner.query(`ALTER TABLE "buildings" RENAME TO "temporary_buildings"`);
        await queryRunner.query(`CREATE TABLE "buildings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "islandId" integer)`);
        await queryRunner.query(`INSERT INTO "buildings"("id", "name", "islandId") SELECT "id", "name", "islandId" FROM "temporary_buildings"`);
        await queryRunner.query(`DROP TABLE "temporary_buildings"`);
        await queryRunner.query(`ALTER TABLE "constructions" RENAME TO "temporary_constructions"`);
        await queryRunner.query(`CREATE TABLE "constructions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tier" integer NOT NULL, "building_id" integer)`);
        await queryRunner.query(`INSERT INTO "constructions"("id", "name", "tier", "building_id") SELECT "id", "name", "tier", "building_id" FROM "temporary_constructions"`);
        await queryRunner.query(`DROP TABLE "temporary_constructions"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "est_value" integer NOT NULL, "tier" integer NOT NULL, "construction_id" integer)`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "est_value", "tier", "construction_id") SELECT "id", "name", "est_value", "tier", "construction_id" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "daily_earnings" RENAME TO "temporary_daily_earnings"`);
        await queryRunner.query(`CREATE TABLE "daily_earnings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "value" integer NOT NULL, "construction_id" integer, "island_id" integer)`);
        await queryRunner.query(`INSERT INTO "daily_earnings"("id", "created_at", "value", "construction_id", "island_id") SELECT "id", "created_at", "value", "construction_id", "island_id" FROM "temporary_daily_earnings"`);
        await queryRunner.query(`DROP TABLE "temporary_daily_earnings"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "islands"`);
        await queryRunner.query(`DROP TABLE "island_types"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
        await queryRunner.query(`DROP TABLE "constructions"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "daily_earnings"`);
    }

}
