import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/roles.guard';
import { Role } from 'src/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
@Controller('crismando')
export class CrismandoController {
  constructor(private readonly crismandoService: CrismandoService) {}

  @Post('criar-crismando')
  create(@Body() createCrismandoDto: CreateCrismandoDto) {
    return this.crismandoService.createCrismando(createCrismandoDto);
  }

  @Get('todos-crismandos')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(Cargo.ANIMADOR, Cargo.FORMADOR)
  findAll() {
    console.log('Controller executado');
    return this.crismandoService.findAllCrismandos();
  }

  // @Get('aniversariantes')
  // buscarAniversarios(@Query() query: BuscarAniversariosDto) {
  //   return this.crismandoService.buscarAniversarios(query.start, query.end);
  // }

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
