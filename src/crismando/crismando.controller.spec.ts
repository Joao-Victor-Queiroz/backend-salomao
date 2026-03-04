import { Test, TestingModule } from '@nestjs/testing';
import { CrismandoController } from './crismando.controller';
import { CrismandoService } from './crismando.service';

describe('CrismandoController', () => {
  let controller: CrismandoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrismandoController],
      providers: [CrismandoService],
    }).compile();

    controller = module.get<CrismandoController>(CrismandoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
