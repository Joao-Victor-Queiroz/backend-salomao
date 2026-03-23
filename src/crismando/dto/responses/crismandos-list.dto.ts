import { ApiProperty } from '@nestjs/swagger';

export class CrismandosListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nomeCrismando: string;

  @ApiProperty()
  dataNascimento: Date;

  @ApiProperty()
  idade: number;

  @ApiProperty()
  nomeGrupo: string;

  @ApiProperty()
  ativo: boolean;
}
