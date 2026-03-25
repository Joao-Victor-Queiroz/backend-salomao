import { IsArray, IsString } from 'class-validator';

export class AddAnimadoresDto {
  @IsArray()
  @IsString({ each: true })
  animadores: string[];
}
