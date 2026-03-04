import { Test, TestingModule } from '@nestjs/testing';
import { CrismandoService } from './crismando.service';

describe('CrismandoService', () => {
  let service: CrismandoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrismandoService],
    }).compile();

    service = module.get<CrismandoService>(CrismandoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
