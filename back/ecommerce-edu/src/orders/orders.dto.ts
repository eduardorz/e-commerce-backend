import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {
    /**
     * Debe ser un uuid
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    /**
     * Debe ser un array (con almenos 1 elemento) de objetos parciales
     * de la entidad Products
     */
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => PartialType(Products))
    @ArrayMinSize(1)
    products: Partial<Products>[];
}