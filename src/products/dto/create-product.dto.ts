import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString, 
    MinLength,
    IsNumber,
    IsPositive,
    IsOptional,
    IsInt,
    IsArray,
    IsIn
} from "class-validator";


export class CreateProductDto {

    @ApiProperty({
        description: 'Product title',
        nullable: false,
        minLength: 1,
        required: true
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;
    
    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty()
    @IsIn(['men', 'womem', 'kid', 'unisex'])
    gender: string;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];
    
    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
