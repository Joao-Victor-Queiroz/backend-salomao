import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';

@Controller('crismando')
export class CrismandoController {
  constructor(private readonly crismandoService: CrismandoService) {}

  @Post()
  create(@Body() createCrismandoDto: CreateCrismandoDto) {
    return this.crismandoService.create(createCrismandoDto);
  }

  @Get()
  findAll() {
    return this.crismandoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crismandoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrismandoDto: UpdateCrismandoDto) {
    return this.crismandoService.update(+id, updateCrismandoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crismandoService.remove(+id);
  }
}
