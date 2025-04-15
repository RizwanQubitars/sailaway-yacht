import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Yacht } from 'src/schemas/Yacht.schema';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { syncYachtDto } from 'src/dtos/yacht.dto';

@Injectable()
export class YachtsService {
    constructor(
        @InjectModel(Yacht.name) private yachtModel: Model<Yacht>,
        private httpService: HttpService
    ) { }

    async syncYachts(yachtData: syncYachtDto)
    {
        const response = await firstValueFrom(
            this.httpService.post(yachtData.url, {
                username: yachtData.username,
                password: yachtData.password,
            })
        );
        const yachts = response.data.yachts; // assuming the response data holds the yacht info
        const newUser = new this.yachtModel(
            {
                yacht: yachts
            }
        );
        const result = newUser.save();
        return "Created";
        
        
    }

    async getAllYachts()
    {
        const yachts =  await this.yachtModel.find();
        return yachts;
    }
}
