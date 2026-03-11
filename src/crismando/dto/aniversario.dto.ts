import { IsString, Matches } from 'class-validator';

export class BuscarAniversariosDto {
  @Matches(/^\d{2}-\d{2}$/, { message: 'O formato deve ser MM-DD' })
  @IsString()
  start: string;

  @Matches(/^\d{2}-\d{2}$/, { message: 'O formato deve ser MM-DD' })
  @IsString()
  end: string;
}
