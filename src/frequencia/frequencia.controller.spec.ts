import { Test, TestingModule } from '@nestjs/testing';
import { FrequenciaController } from './frequencia.controller';
import { FrequenciaService } from './frequencia.service';

describe('FrequenciaController', () => {
  let controller: FrequenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrequenciaController],
      providers: [FrequenciaService],
    }).compile();

    controller = module.get<FrequenciaController>(FrequenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
