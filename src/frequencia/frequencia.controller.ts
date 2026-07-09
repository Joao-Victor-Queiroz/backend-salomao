import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrequenciaService } from './frequencia.service';
import { CreateFrequenciaDto } from './dto/create-frequencia.dto';
import { UpdateFrequenciaDto } from './dto/update-frequencia.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAnimadorFrequenciaDto } from './dto/register-frequencia-animador.dto';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { Frequencia } from './entities/frequencia.entity';
import { BatchPayloadDto } from './dto/batch-payload.dto';
import {
  ApiRegisterFrequenciaDecorator,
  ApiRegisterFrequenciaAnimadorDecorator,
  ApiFindOneFrequenciaDecorator,
  ApiFindFrequenciaFromUniqueCrismandoDecorator,
  ApiUpdateFrequenciaDecorator,
  ApiRemoveFrequenciaDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Frequencias')
@ApiBearerAuth()
@Controller('frequencia')
export class FrequenciaController {
  constructor(private readonly frequenciaService: FrequenciaService) {}

  @ApiRegisterFrequenciaDecorator()
  @Post('registrar-frequencia')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
    Cargo.FORMADOR,
  )
  registerFrequencia(@Body() createFrequenciaDto: CreateFrequenciaDto): Promise<BatchPayloadDto> {
    return this.frequenciaService.registerFrequenciaCrismando(
      createFrequenciaDto,
    );
  }

  @ApiRegisterFrequenciaAnimadorDecorator()
  @Post('frequencia-animadores')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  registerFrequenciaAnimador(
    @Body() createFrequenciaAnimadorDto: CreateAnimadorFrequenciaDto,
  ): Promise<BatchPayloadDto> {
    return this.frequenciaService.registerFrequenciaAnimador(
      createFrequenciaAnimadorDto,
    );
  }

  @ApiFindOneFrequenciaDecorator()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Frequencia> {
    return this.frequenciaService.findOne(id);
  }

  @ApiFindFrequenciaFromUniqueCrismandoDecorator()
  @Get('frequencia-crismando/:idCrismando')
  findFrequenciaFromUniqueCrismando(@Param('idCrismando') idCrismando: string): Promise<Frequencia[]> {
    return this.frequenciaService.findFrequenciaFromUniqueCrismando(idCrismando);
  }

  @ApiUpdateFrequenciaDecorator()
  @Patch(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  update(
    @Param('id') id: string,
    @Body() updateFrequenciaDto: UpdateFrequenciaDto,
  ): Promise<Frequencia> {
    return this.frequenciaService.updateFrequencia(id, updateFrequenciaDto);
  }

  @ApiRemoveFrequenciaDecorator()
  @Delete(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  remove(@Param('id') id: string): Promise<Frequencia> {
    return this.frequenciaService.removeFrequencia(id);
  }
}
