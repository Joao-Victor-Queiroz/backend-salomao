import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimadoresService } from './animadores.service';
import { CreateAnimadorDto } from './dto/create-animador.dto';
import { UpdateAnimadorDto } from './dto/update-animador.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AnimadorResponseDto } from './dto/animador-response.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';
import type { AnimadorSemSenha } from 'src/auth/jwt.strategy';
import {
  ApiCreateAnimadorDecorator,
  ApiFindAllAnimadoresDecorator,
  ApiFindAnimadoresSemGrupoDecorator,
  ApiFindOneAnimadorDecorator,
  ApiUpdateAnimadorDecorator,
  ApiRemoveAnimadorDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Animadores')
@ApiBearerAuth()
@Controller('animadores')
export class AnimadoresController {
  constructor(private readonly animadoresService: AnimadoresService) {}

  @ApiCreateAnimadorDecorator()
  @Post('criar-animador')
  create(@Body() createAnimadorDto: CreateAnimadorDto) {
    return this.animadoresService.criarAnimador(createAnimadorDto);
  }

  @ApiFindAllAnimadoresDecorator()
  @Get()
  findAll(): Promise<AnimadorResponseDto[]> {
    return this.animadoresService.findAll();
  }

  @ApiFindAnimadoresSemGrupoDecorator()
  @Get('animadores-sem-grupo')
  findAnimadoresSemGrupo(): Promise<AnimadorResponseDto[]> {
    return this.animadoresService.findAnimadoresSemGrupo();
  }

  @ApiFindOneAnimadorDecorator()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AnimadorResponseDto> {
    return this.animadoresService.findOne(id);
  }

  @ApiUpdateAnimadorDecorator()
  @Patch('atualizar-animador/:id')
  update(
    @Param('id') id: string,
    @Body() updateAnimadorDto: UpdateAnimadorDto,
    @GetUser() user: AnimadorSemSenha,
  ) {
    return this.animadoresService.update(id, updateAnimadorDto, user);
  }

  @ApiRemoveAnimadorDecorator()
  @Delete('remover-animador/:id')
  remove(@Param('id') id: string, @GetUser() user: AnimadorSemSenha) {
    return this.animadoresService.removeAnimador(id, user);
  }
}
