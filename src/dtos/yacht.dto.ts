import { IsNotEmpty, IsOptional } from "class-validator";

export class syncYachtDto {

    @IsNotEmpty()
    url: string;
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

}
export class getAllYachtsDto {

    @IsNotEmpty()
    page: number;
    
    @IsNotEmpty()
    limit: number;

}
export class getYachtDetailDto {

    @IsNotEmpty()
    id: number;
    
}
export class getFilteredYachtDto {

    @IsNotEmpty()
    page: number;
    
    @IsNotEmpty()
    limit: number;

    @IsOptional()
    locationId: number;
    
}
