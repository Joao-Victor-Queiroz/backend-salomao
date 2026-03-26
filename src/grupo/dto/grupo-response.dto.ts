class Crismando {
  id: string;
  nomeCrismando: string;
  idade: number;
}

class Animador {
  id: string;
  nomeAnimador: string;
}
export class GrupoResponseDto {
  id: string;
  nomeGrupo: string;
  crismandos: Crismando[];
  animadoresMinisterio: Animador[];
}

export class UniqueGrupoResponseDto {
  id: string;
  nomeGrupo: string;
}
