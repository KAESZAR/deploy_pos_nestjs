import { Test, TestingModule } from '@nestjs/testing';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

describe('CouponsController', () => {
  let controller: CouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponsController],
      providers: [
        {
          provide: CouponsService,
          useValue: {
            // Add mock methods as needed
          },
        },
        {
          provide: 'CouponRepository',
          useValue: {
            // Add mock methods as needed
          },
        },
      ],
    }).compile();

    controller = module.get<CouponsController>(CouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
