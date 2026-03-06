import { Module } from '@nestjs/common';
import { FrequenciaService } from './frequencia.service';
import { FrequenciaController } from './frequencia.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FrequenciaController],
  providers: [FrequenciaService, PrismaService],
})
export class FrequenciaModule {}
