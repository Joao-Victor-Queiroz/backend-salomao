import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimadoresModule } from './animadores/animadores.module';
import { AuthModule } from './auth/auth.module';
import { CrismandoModule } from './crismando/crismando.module';

@Module({
  imports: [AnimadoresModule, AuthModule, CrismandoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
