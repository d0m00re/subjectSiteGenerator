import { Test, TestingModule } from '@nestjs/testing';
import { Authv2Service } from './authv2.service';

describe('Authv2Service', () => {
  let service: Authv2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Authv2Service],
    }).compile();

    service = module.get<Authv2Service>(Authv2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
