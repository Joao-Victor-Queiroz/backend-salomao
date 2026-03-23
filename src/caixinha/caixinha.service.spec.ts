import { Test, TestingModule } from '@nestjs/testing';
import { CaixinhaService } from './caixinha.service';

describe('CaixinhaService', () => {
  let service: CaixinhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaixinhaService],
    }).compile();

    service = module.get<CaixinhaService>(CaixinhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
