import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';

@Controller('crismando')
export class CrismandoController {
  constructor(private readonly crismandoService: CrismandoService) {}

  @Post('criar-crismando')
  create(@Body() createCrismandoDto: CreateCrismandoDto) {
    return this.crismandoService.createCrismando(createCrismandoDto);
  }

  @Get('todos-crismandos')
  findAll() {
    return this.crismandoService.findAllCrismandos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crismandoService.findOneCrismando(id); //o "+id" convertia para número
  }

  @Patch('atualizar-crismando/:id')
  update(
    @Param('id') id: string,
    @Body() updateCrismandoDto: UpdateCrismandoDto,
  ) {
    return this.crismandoService.updateCrismando(id, updateCrismandoDto);
  }

  @Delete('remover-crismando/:id')
  remove(@Param('id') id: string) {
    return this.crismandoService.removeCrismando(id);
  }
}
