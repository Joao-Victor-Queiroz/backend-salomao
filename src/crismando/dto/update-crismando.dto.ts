import { PartialType } from '@nestjs/swagger';
import { CreateCrismandoDto } from './create-crismando.dto';

export class UpdateCrismandoDto extends PartialType(CreateCrismandoDto) {}
