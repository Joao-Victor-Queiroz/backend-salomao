import { Grupo } from 'src/generated/prisma/browser';
import { Cargo } from 'src/generated/prisma/enums';

export class Animador {
  id: string;
  nomeAnimador: string;
  email: string;
  password: string;
  cargo: Cargo;
  grupoId?: string;
  grupo?: Grupo;
}
