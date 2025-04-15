import { Test, TestingModule } from '@nestjs/testing';
import { YachtsService } from './yachts.service';

describe('YachtsService', () => {
  let service: YachtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YachtsService],
    }).compile();

    service = module.get<YachtsService>(YachtsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
