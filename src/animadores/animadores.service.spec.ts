import { Test, TestingModule } from '@nestjs/testing';
import { AnimadoresService } from './animadores.service';

describe('AnimadoresService', () => {
  let service: AnimadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimadoresService],
    }).compile();

    service = module.get<AnimadoresService>(AnimadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
