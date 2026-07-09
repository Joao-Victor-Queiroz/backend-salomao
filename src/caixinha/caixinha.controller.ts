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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Cargo } from 'src/generated/prisma/enums';
import { CaixinhaResponseDto } from './dto/caixinha-response.dto';
import {
  ApiCreateCaixinhaDecorator,
  ApiFindOneCaixinhaDecorator,
  ApiUpdateCaixinhaDecorator,
  ApiRemoveCaixinhaDecorator,
} from './decorators/api-swagger.decorator';

@ApiTags('Caixinha')
@ApiBearerAuth()
@Controller('caixinha')
export class CaixinhaController {
  constructor(private readonly caixinhaService: CaixinhaService) {}

  @ApiCreateCaixinhaDecorator()
  @Post()
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
    Cargo.FORMADOR,
  )
  create(@Body() createCaixinhaDto: CreateCaixinhaDto): Promise<CaixinhaResponseDto> {
    return this.caixinhaService.create(createCaixinhaDto);
  }

  @ApiFindOneCaixinhaDecorator()
  @Get(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  findOne(@Param('id') id: string): Promise<CaixinhaResponseDto> {
    return this.caixinhaService.findOne(id);
  }

  @ApiUpdateCaixinhaDecorator()
  @Patch(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  update(
    @Param('id') id: string,
    @Body() updateCaixinhaDto: UpdateCaixinhaDto,
  ): Promise<CaixinhaResponseDto> {
    return this.caixinhaService.update(id, updateCaixinhaDto);
  }

  @ApiRemoveCaixinhaDecorator()
  @Delete(':id')
  @Role(
    Cargo.COORDENADOR_GERAL,
    Cargo.COORDENADOR_CAIXINHA,
    Cargo.ANIMADOR_CAIXINHA,
  )
  remove(@Param('id') id: string): Promise<CaixinhaResponseDto> {
    return this.caixinhaService.remove(id);
  }
}
