import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddAnimadoresDto {
  @ApiProperty({ type: [String], example: ['uuid-animador-1', 'uuid-animador-2'], description: 'Lista de IDs dos animadores a serem adicionados ao grupo' })
  @IsArray()
  @IsString({ each: true })
  animadores: string[];
}
