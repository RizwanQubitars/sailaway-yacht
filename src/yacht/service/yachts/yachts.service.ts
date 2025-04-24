import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Yacht } from 'src/schemas/Yacht.schema';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getFilteredYachtDto, syncYachtDto } from 'src/dtos/yacht.dto';
import { Cabin } from 'src/schemas/Cabin.schema';
import { Countries } from 'src/schemas/Countries.schema';
import { CountryState } from 'src/schemas/CountryState.schema';
import { Location } from 'src/schemas/Location.schema';
import { Region } from 'src/schemas/Region.schema';
import { SailType } from 'src/schemas/SailType.schema';
import { Service } from 'src/schemas/Service.schema';
import _ from 'lodash';
import { Equipment } from 'src/schemas/Equipment.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class YachtsService {
  constructor(
    @InjectModel(Yacht.name) private yachtModel: Model<Yacht>,
    @InjectModel(Cabin.name) private cabinModel: Model<Cabin>,
    @InjectModel(Countries.name) private countriesModel: Model<Countries>,
    @InjectModel(CountryState.name) private countryStateModel: Model<CountryState>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Region.name) private regionModel: Model<Region>,
    @InjectModel(SailType.name) private sailTypeModel: Model<SailType>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Equipment.name) private equipmentModel: Model<Equipment>,
    private httpService: HttpService
  ) { }

  async storeBulk<T>(model: Model<T>, incomingData: any[], matchKey = 'id') {
    const ids = incomingData.map(d => d[matchKey]);

    const existing = await model.find({
      [matchKey]: { $in: ids }
    } as FilterQuery<T>).lean();

    const existingMap = new Map(existing.map(d => [d[matchKey], d]));

    const ops = incomingData.reduce((arr, item) => {
      const current = existingMap.get(item[matchKey]);
      if (!item[matchKey]) return arr;

      if (!current || !_.isEqual(current, item)) {
        arr.push({
          updateOne: {
            filter: { [matchKey]: item[matchKey] },
            update: { $set: item },
            upsert: true,
          },
        });
      }
      return arr;
    }, []);

    if (ops.length) {
      await model.bulkWrite(ops, { ordered: false });
    }
  }
  async syncYachts(yachtData: syncYachtDto) {
    const { username, password, url } = yachtData;

    // Utility to validate array response
    const validateArray = (data: any, key: string) => {
      if (!Array.isArray(data?.[key])) {
        throw new Error(`Invalid response for "${key}": ${JSON.stringify(data)}`);
      }
      return data[key];
    };

    try {
      const [
        // cabinsRes,
        // countriesRes,
        // statesRes,
        // locationsRes,
        // regionsRes,
        // sailTypesRes,
        // servicesRes,
        // yachtsRes,
        equipmentRes,
      ] = await Promise.all([
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/cabins/102701', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/countries', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/countrystates', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/locations', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/regions', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/sailTypes', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/services', { username, password })),
        // firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/yachts/102701', { username, password })),
        firstValueFrom(this.httpService.post('https://ws.nausys.com/CBMS-external/rest/catalogue/v6/equipment', { username, password })),
      ]);

      //   Validate all response data before storing
      //   const cabins = validateArray(cabinsRes.data, 'cabinDefinitions');
      //   const countries = validateArray(countriesRes.data, 'countries');
      //   const countryStates = validateArray(statesRes.data, 'countries');
      //   const locations = validateArray(locationsRes.data, 'locations');
      //   const regions = validateArray(regionsRes.data, 'regions');
      //   const sailTypes = validateArray(sailTypesRes.data, 'sailTypes');
      //   const services = validateArray(servicesRes.data, 'services');
      //   const yachts = validateArray(yachtsRes.data, 'yachts');
      const equipment = validateArray(equipmentRes.data, 'equipment');

      // Bulk write using your enhanced storeBulk with upsert logic
      await Promise.all([
        // this.storeBulk(this.cabinModel, cabins, 'id'),
        // this.storeBulk(this.countriesModel, countries, 'id'),
        // this.storeBulk(this.countryStateModel, countryStates, 'id'),
        // this.storeBulk(this.locationModel, locations, 'id'),
        // this.storeBulk(this.regionModel, regions, 'id'),
        // this.storeBulk(this.sailTypeModel, sailTypes, 'id'),
        // this.storeBulk(this.serviceModel, services, 'id'),
        // this.storeBulk(this.yachtModel, yachts, 'id'),
        this.storeBulk(this.equipmentModel, equipment, 'id'),
      ]);

      return "Sync complete.";
    } catch (error) {
      console.error("SyncYachts Error:", error);
      throw new Error(`Sync failed: ${error.message}`);
    }
  }


  async getAllYachts(query: any) {

    const page = query.page || 1;
    const limit = query.limit || 20;

    // let yachtss: any = await this.yachtModel.find().skip((page - 1) * limit).limit(limit).lean();
    let [yachts, totalCount] = await Promise.all([
      this.yachtModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.yachtModel.countDocuments()
    ]);

    const locationIds = yachts.map((loc: any) => loc.locationId)

    const locations = await this.locationModel.find({ id: { $in: locationIds } }).lean();

    const locationMap = new Map(locations.map(loc => [loc.id, loc]));

    // Step 5: Attach location to each yacht
    const yachtsWithLocations = yachts.map((yacht: any) => ({
      ...yacht,
      location: locationMap.get(yacht.locationId) || null,
    }));

    return {
      data: yachtsWithLocations,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };

  }
  async getYachtDetail(query: any) {
    const yachtID = Number(query.id);

    let yachtDetail = await this.yachtModel.findOne({ id: yachtID }).lean();
    if (!yachtDetail) { throw new RpcException(new HttpException('Record not found', HttpStatus.NOT_FOUND)) }

    const locationId = yachtDetail?.id;
    const location: any = await this.locationModel.findOne({ id: locationId }).lean();
    console.log(location)

    yachtDetail = {
      ...yachtDetail,
      ...location
    }

    return yachtDetail;

  }
  async getFilteredYachts(query: getFilteredYachtDto) {

    const page = query.page || 1;
    const limit = query.limit || 20;

    let filterQuery: any = {}

    if (query.locationId) filterQuery.locationId = Number(query.locationId)
    if (query.noOfCabin) filterQuery.cabins = Number(query.noOfCabin)
    if (query.noOfBirth) filterQuery.berthsTotal = Number(query.noOfBirth)
      
    let [yachts, totalCount] = await Promise.all([
      this.yachtModel
        .find(filterQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.yachtModel.countDocuments(filterQuery)
    ]);
    const locationIds = yachts.map((loc: any) => loc.locationId)
    const locations = await this.locationModel.find({ id: { $in: locationIds } }).lean();
    const locationMap = new Map(locations.map(loc => [loc.id, loc]));

    // Step 5: Attach location to each yacht
    const yachtsWithLocations = yachts.map((yacht: any) => ({
      ...yacht,
      location: locationMap.get(yacht.locationId) || null,
    }));

    return {
      data: yachtsWithLocations,
      currentPage: page,
      pageSize: limit,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };;

  }
  async getAllYachtLocation() {

    const locations = await this.locationModel.find().lean();

    return locations;

  }
}
