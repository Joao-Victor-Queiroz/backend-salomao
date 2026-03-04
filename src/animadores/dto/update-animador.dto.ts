import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimadorDto } from './create-animador.dto';

export class UpdateAnimadorDto extends PartialType(CreateAnimadorDto) {}
