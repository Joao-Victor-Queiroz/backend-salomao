import { IsArray, IsString } from 'class-validator';

export class AddCrismandosDto {
  @IsArray()
  @IsString({ each: true })
  crismandos: string[];
}
