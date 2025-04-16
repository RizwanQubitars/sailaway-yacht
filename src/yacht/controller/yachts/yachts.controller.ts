import { Body, Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { successResponse } from 'src/common/helperFunctions/response.helper';
import { syncYachtDto } from 'src/dtos/yacht.dto';
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
    async getAllYachts() {
        const yachts = await this.yachtService.getAllYachts()
        return successResponse({
            status: 200,
            message: "Get all yachts Succeed",
            data: yachts
        });
    }
}
