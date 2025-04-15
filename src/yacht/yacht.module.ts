import { Module } from '@nestjs/common';
import { YachtsController } from './controller/yachts/yachts.controller';
import { YachtsService } from './service/yachts/yachts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Yacht, yachtSchema } from 'src/schemas/Yacht.schema';
import { HttpModule, HttpService } from '@nestjs/axios';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
    MongooseModule.forFeature([
      {
        name: Yacht.name,
        schema: yachtSchema,
      },
  ]),
  HttpModule,
  ],
  controllers: [YachtsController],
  providers: [YachtsService, HttpModule],
  exports: [HttpModule]
})
export class YachtModule {}
