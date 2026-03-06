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

@Controller('frequencia')
export class FrequenciaController {
  constructor(private readonly frequenciaService: FrequenciaService) {}

  @Post('registrar-frequencia')
  registerFrequencia(@Body() createFrequenciaDto: CreateFrequenciaDto) {
    return this.frequenciaService.registerFrequencia(createFrequenciaDto);
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
