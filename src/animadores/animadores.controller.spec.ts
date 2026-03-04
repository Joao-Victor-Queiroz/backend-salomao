import { Test, TestingModule } from '@nestjs/testing';
import { AnimadoresController } from './animadores.controller';
import { AnimadoresService } from './animadores.service';

describe('AnimadoresController', () => {
  let controller: AnimadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimadoresController],
      providers: [AnimadoresService],
    }).compile();

    controller = module.get<AnimadoresController>(AnimadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
