import { Test, TestingModule } from '@nestjs/testing';
import { FrequenciaService } from './frequencia.service';

describe('FrequenciaService', () => {
  let service: FrequenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequenciaService],
    }).compile();

    service = module.get<FrequenciaService>(FrequenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
