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
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CrismandosListResponseDto,
  CrismandosSemGrupoDto,
} from './dto/responses/crismandos-list.dto';
import { CrismandoEntity } from './entities/crismando.entity';
import {
  ApiCreateCrismandoDecorator,
  ApiFindAllCrismandosDecorator,
  ApiFindCrismandosSemGrupoDecorator,
  ApiFindOneCrismandoDecorator,
  ApiUpdateCrismandoDecorator,
  ApiRemoveCrismandoDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Crismandos')
@ApiBearerAuth()
@Controller('crismando')
export class CrismandoController {
  constructor(private readonly crismandoService: CrismandoService) {}

  @ApiCreateCrismandoDecorator()
  @Post('criar-crismando')
  create(@Body() createCrismandoDto: CreateCrismandoDto): Promise<CrismandoEntity> {
    return this.crismandoService.createCrismando(createCrismandoDto);
  }

  @ApiFindAllCrismandosDecorator()
  @Get('todos-crismandos')
  findAll(): Promise<CrismandosListResponseDto[]> {
    return this.crismandoService.findAllCrismandos();
  }

  @ApiFindCrismandosSemGrupoDecorator()
  @Get('crismandos-sem-grupo')
  findCrismandosSemGrupo(): Promise<CrismandosSemGrupoDto[]> {
    return this.crismandoService.findCrismandosSemGrupo();
  }

  @ApiFindOneCrismandoDecorator()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CrismandoEntity> {
    return this.crismandoService.findOneCrismando(id);
  }

  @ApiUpdateCrismandoDecorator()
  @Patch('atualizar-crismando/:id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
    Cargo.FORMADOR,
  )
  update(
    @Param('id') id: string,
    @Body() updateCrismandoDto: UpdateCrismandoDto,
  ): Promise<CrismandoEntity> {
    return this.crismandoService.updateCrismando(id, updateCrismandoDto);
  }

  @ApiRemoveCrismandoDecorator()
  @Delete('remover-crismando/:id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_FREQUENCIA,
    Cargo.ANIMADOR_FREQUENCIA,
  )
  remove(@Param('id') id: string): Promise<CrismandoEntity> {
    return this.crismandoService.removeCrismando(id);
  }
}
