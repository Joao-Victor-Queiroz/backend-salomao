import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaixinhaService } from './caixinha.service';
import { CreateCaixinhaDto } from './dto/create-caixinha.dto';
import { UpdateCaixinhaDto } from './dto/update-caixinha.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';

@ApiBearerAuth()
@Controller('caixinha')
export class CaixinhaController {
  constructor(private readonly caixinhaService: CaixinhaService) {}

  @Post()
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
    Cargo.FORMADOR,
  )
  create(@Body() createCaixinhaDto: CreateCaixinhaDto) {
    return this.caixinhaService.create(createCaixinhaDto);
  }

  @Get(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  findOne(@Param('id') id: string) {
    return this.caixinhaService.findOne(id);
  }

  @Patch(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  update(
    @Param('id') id: string,
    @Body() updateCaixinhaDto: UpdateCaixinhaDto,
  ) {
    return this.caixinhaService.update(id, updateCaixinhaDto);
  }

  @Delete(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  remove(@Param('id') id: string) {
    return this.caixinhaService.remove(id);
  }
}
