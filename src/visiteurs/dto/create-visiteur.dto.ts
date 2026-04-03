import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateVisiteurDto {
  @IsInt()
  @Min(1)
  numeroVisiteur!: number;

  @IsString()
  nom!: string;

  @IsInt()
  @Min(0)
  nombreJours!: number;

  @IsNumber()
  @Min(0)
  tarifJournalier!: number;
}
