import { Test, TestingModule } from '@nestjs/testing';
import { ConfigTemplateService } from './config-template.service';

describe('ConfigTemplateService', () => {
  let service: ConfigTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigTemplateService],
    }).compile();

    service = module.get<ConfigTemplateService>(ConfigTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
