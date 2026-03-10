import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { AddCrismandosDto } from './dto/add-crismandos.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post('criar-grupo')
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.createGrupo(createGrupoDto);
  }

  @Get('todos-grupos')
  findAll() {
    return this.grupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoService.findOne(id);
  }

  @Post('adicionar-crismandos/:id')
  addCrismandos(
    @Param('id') id: string,
    @Body() addCrismandosDto: AddCrismandosDto,
  ) {
    return this.grupoService.addCrismandos(id, addCrismandosDto);
  }

  @Patch('atualizar-grupo/:id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(id, updateGrupoDto);
  }

  @Delete('remover-grupo/:id')
  remove(@Param('id') id: string) {
    return this.grupoService.remove(id);
  }
}
