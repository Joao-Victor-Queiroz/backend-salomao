import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGrupoDto {
  @ApiProperty({ example: 'Grupo Esperança', description: 'Nome do grupo de crismando' })
  @IsString()
  nomeGrupo: string;
}
