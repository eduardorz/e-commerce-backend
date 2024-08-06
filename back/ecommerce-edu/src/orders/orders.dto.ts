import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => PartialType(Products))
    @ArrayMinSize(1)
    products: Partial<Products>[];
}