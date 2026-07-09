import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCrismandosDto {
  @ApiProperty({ type: [String], example: ['uuid-crismando-1', 'uuid-crismando-2'], description: 'Lista de IDs dos crismandos a serem adicionados ao grupo' })
  @IsArray()
  @IsString({ each: true })
  crismandos: string[];
}
