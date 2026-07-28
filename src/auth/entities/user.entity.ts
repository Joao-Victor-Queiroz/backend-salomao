import { Cargo } from 'src/generated/prisma/enums';
import { Animador } from 'src/animadores/entities/animador.entity';

export class Usuario {
  id: string;
  nome: string;
  email: string;
  password?: string;
  cargo: Cargo;
  animadorId?: string | null;
  animador?: Animador | null;
}
