import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimadoresService } from './animadores.service';
import { CreateAnimadorDto } from './dto/create-animador.dto';
// import { UpdateAnimadorDto } from './dto/update-animador.dto';

@Controller('animadores')
export class AnimadoresController {
  constructor(private readonly animadoresService: AnimadoresService) {}

  @Post()
  create(@Body() createAnimadorDto: CreateAnimadorDto) {
    return this.animadoresService.criarAnimador(createAnimadorDto);
  }

  @Get()
  findAll() {
    return this.animadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animadoresService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@CurrentUser() user: any) {
  //   return this.animadoresService.findById(user.id);
  // }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAnimadorDto: UpdateAnimadorDto,
  // ) {
  //   return this.animadoresService.update(+id, updateAnimadorDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animadoresService.remove(+id);
  }
}
