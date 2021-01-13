import {MigrationInterface, QueryRunner} from "typeorm";

export class populationBuildings1609311214900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO buildings(name) VALUES ('Economy')")
        await queryRunner.query("INSERT INTO buildings(name) VALUES ('Farming')")
        await queryRunner.query("INSERT INTO buildings(name) VALUES ('Military')")
        await queryRunner.query("INSERT INTO buildings(name) VALUES ('Houses')")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
