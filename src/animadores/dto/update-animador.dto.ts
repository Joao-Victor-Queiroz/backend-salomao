import { PartialType } from '@nestjs/swagger';
import { CreateAnimadorDto } from './create-animador.dto';

export class UpdateAnimadorDto extends PartialType(CreateAnimadorDto) {}
