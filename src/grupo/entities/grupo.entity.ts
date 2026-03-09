import { Animador, Crismando } from 'src/generated/prisma/client';

export class Grupo {
  nomeGrupo: string;
  id: string;
  animadores: Animador[];
  crismandos: Crismando[];
}
