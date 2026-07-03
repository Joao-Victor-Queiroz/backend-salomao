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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { AddAnimadoresDto } from './dto/add-animadores.dto';
import {
  GrupoResponseDto,
  UniqueGrupoResponseDto,
} from './dto/grupo-response.dto';

@ApiBearerAuth()
@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post('criar-grupo')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA, Cargo.FORMADOR)
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.grupoService.createGrupo(createGrupoDto);
  }

  @Get('todos-grupos')
  findAll(): Promise<UniqueGrupoResponseDto[]> {
    return this.grupoService.findAll();
  }

  @Get('grupo-animadores')
  findGrupoAnimadoresFrequencia() {
    return this.grupoService.findGrupoAnimadoresFrequencia();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrupoResponseDto> {
    return this.grupoService.findGrupoCrismandos(id);
  }

  @Patch('adicionar-crismandos/:id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
    Cargo.FORMADOR,
  )
  addCrismandos(
    @Param('id') id: string,
    @Body() addCrismandosDto: AddCrismandosDto,
  ) {
    return this.grupoService.addCrismandos(id, addCrismandosDto);
  }

  @Patch('adicionar-animadores/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  addAnimadores(
    @Param('id') id: string,
    @Body() addAnimadoresDto: AddAnimadoresDto,
  ) {
    return this.grupoService.addAnimadores(id, addAnimadoresDto);
  }

  @Patch('remover-crismando/:idGrupo/:idCrismando')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  removerCrismando(
    @Param('idGrupo') idGrupo: string,
    @Param('idCrismando') idCrismando: string,
  ) {
    return this.grupoService.removerCrismando(idGrupo, idCrismando);
  }

  @Patch('atualizar-grupo/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(id, updateGrupoDto);
  }

  @Delete('remover-grupo/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  remove(@Param('id') id: string) {
    return this.grupoService.remove(id);
  }
}
