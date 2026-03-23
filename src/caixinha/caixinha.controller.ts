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

@ApiBearerAuth()
@Controller('caixinha')
export class CaixinhaController {
  constructor(private readonly caixinhaService: CaixinhaService) {}

  @Post()
  create(@Body() createCaixinhaDto: CreateCaixinhaDto) {
    return this.caixinhaService.create(createCaixinhaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caixinhaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCaixinhaDto: UpdateCaixinhaDto,
  ) {
    return this.caixinhaService.update(id, updateCaixinhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caixinhaService.remove(id);
  }
}
