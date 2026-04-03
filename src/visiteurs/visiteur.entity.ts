import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'visiteur' })
export class VisiteurEntity {
  @PrimaryColumn({ type: 'integer' })
  numeroVisiteur!: number;

  @Column({ type: 'text' })
  nom!: string;

  @Column({ type: 'integer' })
  nombreJours!: number;

  @Column({ type: 'real' })
  tarifJournalier!: number;
}
