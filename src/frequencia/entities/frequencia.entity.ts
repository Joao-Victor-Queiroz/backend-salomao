import { StatusFrequencia } from 'src/generated/prisma/enums';

export class Frequencia {
  id: string;
  crismandoId: string;
  status: StatusFrequencia;
  dataFrequencia: Date;
  justificativa?: string | null;
}
