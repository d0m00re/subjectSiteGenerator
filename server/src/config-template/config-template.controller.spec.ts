import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTemplateController } from './config-template.controller';

describe('ConfigTemplateController', () => {
  let controller: ConfigTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigTemplateController],
    }).compile();

    controller = module.get<ConfigTemplateController>(ConfigTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
