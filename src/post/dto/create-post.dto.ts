import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}