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

  @ApiProperty()
  primeiraEucaristia: string;

  @ApiProperty()
  batizado: string;
}

export class CrismandosSemGrupoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nomeCrismando: string;

  @ApiProperty()
  dataNascimento: Date;

  @ApiProperty()
  idade: number;

  @ApiProperty()
  ativo: boolean;
}
