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
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateAnimadorFrequenciaDto } from './dto/register-frequencia-animador.dto';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';

@ApiBearerAuth()
@Controller('frequencia')
export class FrequenciaController {
  constructor(private readonly frequenciaService: FrequenciaService) {}

  @Post('registrar-frequencia')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
  )
  registerFrequencia(@Body() createFrequenciaDto: CreateFrequenciaDto) {
    return this.frequenciaService.registerFrequenciaCrismando(
      createFrequenciaDto,
    );
  }

  @Post('frequencia-animadores')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  registerFrequenciaAnimador(
    @Body() createFrequenciaAnimadorDto: CreateAnimadorFrequenciaDto,
  ) {
    return this.frequenciaService.registerFrequenciaAnimador(
      createFrequenciaAnimadorDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frequenciaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrequenciaDto: UpdateFrequenciaDto,
  ) {
    return this.frequenciaService.updateFrequencia(id, updateFrequenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frequenciaService.removeFrequencia(id);
  }
}
