import { Module } from '@nestjs/common';
import { CaixinhaService } from './caixinha.service';
import { CaixinhaController } from './caixinha.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CaixinhaController],
  providers: [CaixinhaService, PrismaService],
})
export class CaixinhaModule {}
