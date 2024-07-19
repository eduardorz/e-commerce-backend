import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1721426289998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // aca van comandos sql que van a hacer un cambio
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // comandos sql que revierten los cambios
    }

}
