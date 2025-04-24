import { Body, Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { successResponse } from 'src/common/helperFunctions/response.helper';
import { getAllYachtsDto, getYachtDetailDto, syncYachtDto } from 'src/dtos/yacht.dto';
import { YachtsService } from 'src/yacht/service/yachts/yachts.service';

@Controller('yachts')
export class YachtsController {
    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private yachtService: YachtsService,
    ) { }
    @MessagePattern({ cmd: 'synchYachts' })
    async createUser(@Body() yachtData: syncYachtDto) {
        const createYacht = await this.yachtService.syncYachts(yachtData)

        return createYacht;
    }
    @MessagePattern({ cmd: 'getYachts' })
    async getAllYachts(@Payload() query: getAllYachtsDto) {
        const yachts = await this.yachtService.getAllYachts(query)
        
        return successResponse({
            status: 200,
            message: "Get all yachts Succeed",
            data: yachts
        });
    }
    @MessagePattern({ cmd: 'getYachtDetail' })
    async getYachtDetail(@Payload() query: getYachtDetailDto) {
        const yachts = await this.yachtService.getYachtDetail(query)
        
        return successResponse({
            status: 200,
            message: "Get yacht detail Succeed",
            data: yachts
        });
    }
    @MessagePattern({ cmd: 'getFilteredYacht' })
    async getFilteredYachts(@Payload() query: any) {
        const yachts = await this.yachtService.getFilteredYachts(query)
        
        return successResponse({
            status: 200,
            message: "Get all filterd yachts Succeed",
            data: yachts
        });
    }
    @MessagePattern({ cmd: 'getAllLocation' })
    async getAllLocations() {
        const locations = await this.yachtService.getAllYachtLocation()
        
        return successResponse({
            status: 200,
            message: "Get all yacht locations succeed!",
            data: locations
        });
    }
}
