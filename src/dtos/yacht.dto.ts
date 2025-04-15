import { IsNotEmpty } from "class-validator";

export class syncYachtDto {

    @IsNotEmpty()
    url: string;
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

}