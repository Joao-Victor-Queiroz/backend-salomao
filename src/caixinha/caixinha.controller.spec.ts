import { Test, TestingModule } from '@nestjs/testing';
import { CaixinhaController } from './caixinha.controller';
import { CaixinhaService } from './caixinha.service';

describe('CaixinhaController', () => {
  let controller: CaixinhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaixinhaController],
      providers: [CaixinhaService],
    }).compile();

    controller = module.get<CaixinhaController>(CaixinhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
