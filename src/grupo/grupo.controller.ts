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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { AddAnimadoresDto } from './dto/add-animadores.dto';
import {
  GrupoResponseDto,
  UniqueGrupoResponseDto,
  GrupoAnimadoresFrequenciaResponseDto,
} from './dto/grupo-response.dto';
import {
  ApiCreateGrupoDecorator,
  ApiFindAllGruposDecorator,
  ApiFindGrupoAnimadoresFrequenciaDecorator,
  ApiFindOneGrupoDecorator,
  ApiAddCrismandosDecorator,
  ApiAddAnimadoresDecorator,
  ApiRemoverCrismandoDecorator,
  ApiUpdateGrupoDecorator,
  ApiRemoveGrupoDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Grupos')
@ApiBearerAuth()
@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @ApiCreateGrupoDecorator()
  @Post('criar-grupo')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA, Cargo.FORMADOR)
  create(@Body() createGrupoDto: CreateGrupoDto): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.createGrupo(createGrupoDto);
  }

  @ApiFindAllGruposDecorator()
  @Get('todos-grupos')
  findAll(): Promise<UniqueGrupoResponseDto[]> {
    return this.grupoService.findAll();
  }

  @ApiFindGrupoAnimadoresFrequenciaDecorator()
  @Get('grupo-animadores')
  findGrupoAnimadoresFrequencia(): Promise<GrupoAnimadoresFrequenciaResponseDto> {
    return this.grupoService.findGrupoAnimadoresFrequencia();
  }

  @ApiFindOneGrupoDecorator()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GrupoResponseDto> {
    return this.grupoService.findGrupoCrismandos(id);
  }

  @ApiAddCrismandosDecorator()
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
  ): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.addCrismandos(id, addCrismandosDto);
  }

  @ApiAddAnimadoresDecorator()
  @Patch('adicionar-animadores/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  addAnimadores(
    @Param('id') id: string,
    @Body() addAnimadoresDto: AddAnimadoresDto,
  ): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.addAnimadores(id, addAnimadoresDto);
  }

  @ApiRemoverCrismandoDecorator()
  @Patch('remover-crismando/:idGrupo/:idCrismando')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  removerCrismando(
    @Param('idGrupo') idGrupo: string,
    @Param('idCrismando') idCrismando: string,
  ): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.removerCrismando(idGrupo, idCrismando);
  }

  @ApiUpdateGrupoDecorator()
  @Patch('atualizar-grupo/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.update(id, updateGrupoDto);
  }

  @ApiRemoveGrupoDecorator()
  @Delete('remover-grupo/:id')
  @Role(Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA)
  remove(@Param('id') id: string): Promise<UniqueGrupoResponseDto> {
    return this.grupoService.remove(id);
  }
}
