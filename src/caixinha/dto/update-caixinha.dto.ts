import { PartialType } from '@nestjs/swagger';
import { CreateCaixinhaDto } from './create-caixinha.dto';

export class UpdateCaixinhaDto extends PartialType(CreateCaixinhaDto) {}
