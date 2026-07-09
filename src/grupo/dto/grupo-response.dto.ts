import { ApiProperty } from '@nestjs/swagger';

class GrupoCrismandoResponse {
  @ApiProperty({ example: 'uuid-crismando-123' })
  id: string;

  @ApiProperty({ example: 'João Silva' })
  nomeCrismando: string;

  @ApiProperty({ example: 15 })
  idade: number;
}

class GrupoAnimadorResponse {
  @ApiProperty({ example: 'uuid-animador-456' })
  id: string;

  @ApiProperty({ example: 'Maria Souza' })
  nomeAnimador: string;
}

export class GrupoResponseDto {
  @ApiProperty({ example: 'uuid-grupo-789' })
  id: string;

  @ApiProperty({ example: 'Grupo Esperança' })
  nomeGrupo: string;

  @ApiProperty({ type: [GrupoCrismandoResponse] })
  crismandos: GrupoCrismandoResponse[];

  @ApiProperty({ type: [GrupoAnimadorResponse] })
  animadoresMinisterio: GrupoAnimadorResponse[];
}

export class UniqueGrupoResponseDto {
  @ApiProperty({ example: 'uuid-grupo-789' })
  id: string;

  @ApiProperty({ example: 'Grupo Esperança' })
  nomeGrupo: string;
}

class AnimadorFrequenciaResponse {
  @ApiProperty({ example: 'uuid-animador-456' })
  id: string;

  @ApiProperty({ example: 'Maria Souza' })
  nomeAnimador: string;
}

export class GrupoAnimadoresFrequenciaResponseDto {
  @ApiProperty({ example: 'uuid-grupo-789' })
  id: string;

  @ApiProperty({ example: 'Grupo Esperança' })
  nomeGrupo: string;

  @ApiProperty({ type: [AnimadorFrequenciaResponse] })
  animadoresFrequencia: AnimadorFrequenciaResponse[];
}
