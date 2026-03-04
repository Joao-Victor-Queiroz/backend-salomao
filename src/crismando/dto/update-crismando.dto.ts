import { PartialType } from '@nestjs/mapped-types';
import { CreateCrismandoDto } from './create-crismando.dto';

export class UpdateCrismandoDto extends PartialType(CreateCrismandoDto) {}
