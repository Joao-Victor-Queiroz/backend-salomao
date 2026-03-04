import { Module } from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CrismandoController } from './crismando.controller';

@Module({
  controllers: [CrismandoController],
  providers: [CrismandoService],
})
export class CrismandoModule {}
