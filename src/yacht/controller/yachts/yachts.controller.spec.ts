import { Test, TestingModule } from '@nestjs/testing';
import { YachtsController } from './yachts.controller';

describe('YachtsController', () => {
  let controller: YachtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YachtsController],
    }).compile();

    controller = module.get<YachtsController>(YachtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
