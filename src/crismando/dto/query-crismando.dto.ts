import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class QueryCrismandoDto {
    @Type(() => Number)
    @IsInt()
    limit: number = 10;

    @Type(() => Number)
    @IsInt()
    page: number = 1;
}