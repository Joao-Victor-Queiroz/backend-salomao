import { Animador, Crismando } from 'src/generated/prisma/client';

export class GrupoResponseDto {
  id: string;
  nomeGrupo: string;
  crismandos: Crismando[];
  animadores: Animador[];
}
