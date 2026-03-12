import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimadoresModule } from './animadores/animadores.module';
import { AuthModule } from './auth/auth.module';
import { CrismandoModule } from './crismando/crismando.module';
import { FrequenciaModule } from './frequencia/frequencia.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './config/allExceptions.filter';
import { GrupoModule } from './grupo/grupo.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AnimadoresModule,
    AuthModule,
    CrismandoModule,
    FrequenciaModule,
    GrupoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
