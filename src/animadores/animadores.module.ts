import { Module } from '@nestjs/common';
import { AnimadoresService } from './animadores.service';
import { AnimadoresController } from './animadores.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AnimadoresController],
  providers: [AnimadoresService, PrismaService],
  exports: [AnimadoresService],
})
export class AnimadoresModule {}
