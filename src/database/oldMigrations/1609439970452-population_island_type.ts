import {MigrationInterface, QueryRunner} from "typeorm";

export class populationIslandType1609439970452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO island_type(name) VALUES ('Personal')")
        await queryRunner.query("INSERT INTO island_type(name) VALUES ('Guild')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM island_type WHERE name = 'Personal'")
        await queryRunner.query("DELETE FROM island_type WHERE name = 'Guild'")
    }

}
