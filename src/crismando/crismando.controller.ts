import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { CrismandoService } from './crismando.service';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  CrismandosListResponseDto,
  CrismandosSemGrupoDto,
} from './dto/responses/crismandos-list.dto';
import { CrismandoEntity } from './entities/crismando.entity';
import { QueryCrismandoDto } from './dto/query-crismando.dto';

@ApiBearerAuth()
@Controller('crismando')
export class CrismandoController {
  constructor(private readonly crismandoService: CrismandoService) {}

  @Post('criar-crismando')
  @ApiBody({ type: CreateCrismandoDto })
  @ApiCreatedResponse({
    type: CreateCrismandoDto,
    description: 'Requisição para registrar um novo crismando.',
  })
  create(@Body() createCrismandoDto: CreateCrismandoDto) {
    return this.crismandoService.createCrismando(createCrismandoDto);
  }

  @Get('todos-crismandos')
  @ApiOkResponse({ type: CrismandosListResponseDto, isArray: true })
  findAll(@Query() query: QueryCrismandoDto) {
    console.log('Controller executado');
    return this.crismandoService.findAllCrismandos(query);
  }

  @Get('crismandos-sem-grupo')
  @ApiOkResponse({ type: CrismandosSemGrupoDto, isArray: true })
  findCrismandosSemGrupo() {
    return this.crismandoService.findCrismandosSemGrupo();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CrismandoEntity,
    description: 'Retorna os dados de um crismando.',
  })
  findOne(@Param('id') id: string) {
    return this.crismandoService.findOneCrismando(id); //o "+id" convertia para número
  }

  @Patch('atualizar-crismando/:id')
  @ApiBody({ type: UpdateCrismandoDto })
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
  )
  update(
    @Param('id') id: string,
    @Body() updateCrismandoDto: UpdateCrismandoDto,
  ) {
    return this.crismandoService.updateCrismando(id, updateCrismandoDto);
  }

  @Delete('remover-crismando/:id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
  )
  remove(@Param('id') id: string) {
    return this.crismandoService.removeCrismando(id);
  }
}
