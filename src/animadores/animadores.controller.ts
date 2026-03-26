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
import { ApiBearerAuth } from '@nestjs/swagger';
import { AnimadorResponseDto } from './dto/animador-response.dto';
import { GetUser } from 'src/auth/decorators/user.decorator';
import type { Payload } from 'src/auth/jwt.strategy';

@ApiBearerAuth()
@Controller('animadores')
export class AnimadoresController {
  constructor(private readonly animadoresService: AnimadoresService) {}

  @Post('criar-animador')
  create(@Body() createAnimadorDto: CreateAnimadorDto) {
    return this.animadoresService.criarAnimador(createAnimadorDto);
  }

  @Get()
  findAll(): Promise<AnimadorResponseDto[]> {
    return this.animadoresService.findAll();
  }

  @Get('animadores-sem-grupo')
  findAnimadoresSemGrupo() {
    return this.animadoresService.findAnimadoresSemGrupo();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animadoresService.findOne(id);
  }

  @Patch('atualizar-animador/:id')
  update(
    @Param('id') id: string,
    @Body() updateAnimadorDto: UpdateAnimadorDto,
    @GetUser() user: Payload,
  ) {
    return this.animadoresService.update(id, updateAnimadorDto, user);
  }

  @Delete('remover-animador/:id')
  remove(@Param('id') id: string, @GetUser() user: Payload) {
    return this.animadoresService.removeAnimador(id, user);
  }
}
