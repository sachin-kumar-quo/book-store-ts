import {MigrationInterface, QueryRunner} from "typeorm";

export class testMigration1640604941055 implements MigrationInterface {
    name = 'testMigration1640604941055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`pages\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`pages\` int NOT NULL`);
    }

}
