import { Test, TestingModule } from '@nestjs/testing';
import { Authv2Controller } from './authv2.controller';

describe('Authv2Controller', () => {
  let controller: Authv2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Authv2Controller],
    }).compile();

    controller = module.get<Authv2Controller>(Authv2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
