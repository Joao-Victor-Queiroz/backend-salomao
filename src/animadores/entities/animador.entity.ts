import { Grupo } from 'src/generated/prisma/client';
import { Cargo } from 'src/generated/prisma/enums';

export class Animador {
  id: string;
  nomeAnimador: string;
  cargo: Cargo;
  dataNascimento: Date;
  grupoAnimadorId?: string | null;
  grupoCrismandoId?: string | null;
  grupoAnimador?: Grupo | null;
  grupoCrismando?: Grupo | null;
}
