import { Module } from '@nestjs/common';
import { YachtsController } from './controller/yachts/yachts.controller';
import { YachtsService } from './service/yachts/yachts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Yacht, yachtSchema } from 'src/schemas/Yacht.schema';
import { HttpModule, HttpService } from '@nestjs/axios';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { Cabin, CabinSchema } from 'src/schemas/Cabin.schema';
import { Countries, CountriesSchema } from 'src/schemas/Countries.schema';
import { CountryState, CountryStateSchema } from 'src/schemas/CountryState.schema';
import { Location, LocationSchema } from 'src/schemas/Location.schema';
import { Region, RegionSchema } from 'src/schemas/Region.schema';
import { SailType, SailTypeSchema } from 'src/schemas/SailType.schema';
import { Service, ServiceSchema } from 'src/schemas/Service.schema';
import { Equipment, EquipmentSchema } from 'src/schemas/Equipment.schema';

@Module({
  imports: [
    NatsClientModule,
    MongooseModule.forFeature([
      {
        name: Yacht.name,
        schema: yachtSchema,
      },
      {
        name: Cabin.name,
        schema: CabinSchema,
      },
      {
        name: Countries.name,
        schema: CountriesSchema,
      },
      {
        name: CountryState.name,
        schema: CountryStateSchema,
      },
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: Region.name,
        schema: RegionSchema,
      },
      {
        name: SailType.name,
        schema: SailTypeSchema,
      },
      {
        name: Service.name,
        schema: ServiceSchema,
      },
      {
        name: Equipment.name,
        schema: EquipmentSchema,
      },
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
