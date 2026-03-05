import { Module } from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CrismandoController } from './crismando.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CrismandoController],
  providers: [CrismandoService, PrismaService],
})
export class CrismandoModule {}
