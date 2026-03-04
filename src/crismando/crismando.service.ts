import { Injectable } from '@nestjs/common';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';

@Injectable()
export class CrismandoService {
  create(createCrismandoDto: CreateCrismandoDto) {
    return 'This action adds a new crismando';
  }

  findAll() {
    return `This action returns all crismando`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crismando`;
  }

  update(id: number, updateCrismandoDto: UpdateCrismandoDto) {
    return `This action updates a #${id} crismando`;
  }

  remove(id: number) {
    return `This action removes a #${id} crismando`;
  }
}
