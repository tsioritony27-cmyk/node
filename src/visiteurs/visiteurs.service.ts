import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVisiteurDto } from './dto/create-visiteur.dto';
import { UpdateVisiteurDto } from './dto/update-visiteur.dto';
import { VisiteurEntity } from './visiteur.entity';

export type VisiteurView = {
  numeroVisiteur: number;
  nom: string;
  nombreJours: number;
  tarifJournalier: number;
  tarif: number;
};

export type WriteResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type BilanResponse = {
  total: number;
  min: number | null;
  max: number | null;
  items: Array<Pick<VisiteurView, 'numeroVisiteur' | 'nom' | 'tarif'>>;
};

@Injectable()
export class VisiteursService {
  constructor(
    @InjectRepository(VisiteurEntity)
    private readonly repo: Repository<VisiteurEntity>,
  ) {}

  private toView(v: VisiteurEntity): VisiteurView {
    const tarif = v.nombreJours * v.tarifJournalier;
    return {
      numeroVisiteur: v.numeroVisiteur,
      nom: v.nom,
      nombreJours: v.nombreJours,
      tarifJournalier: v.tarifJournalier,
      tarif,
    };
  }

  async create(dto: CreateVisiteurDto): Promise<WriteResponse<VisiteurView>> {
    const existing = await this.repo.findOne({
      where: { numeroVisiteur: dto.numeroVisiteur },
    });
    if (existing) {
      return {
        success: false,
        message: 'Insertion échouée (n° visiteur existe déjà).',
      };
    }

    const entity = this.repo.create(dto);
    const saved = await this.repo.save(entity);
    return {
      success: true,
      message: 'Insertion réussie.',
      data: this.toView(saved),
    };
  }

  async findAll(): Promise<VisiteurView[]> {
    const all = await this.repo.find({
      order: { numeroVisiteur: 'ASC' },
    });
    return all.map((v) => this.toView(v));
  }

  async update(
    numeroVisiteur: number,
    dto: UpdateVisiteurDto,
  ): Promise<WriteResponse<VisiteurView>> {
    const existing = await this.repo.findOne({
      where: { numeroVisiteur },
    });
    if (!existing) {
      return {
        success: false,
        message: 'Modification échouée (visiteur introuvable).',
      };
    }

    const updated = await this.repo.save({
      ...existing,
      ...dto,
      numeroVisiteur,
    });

    return {
      success: true,
      message: 'Modification réussie.',
      data: this.toView(updated),
    };
  }

  async remove(numeroVisiteur: number): Promise<WriteResponse<null>> {
    const existing = await this.repo.findOne({
      where: { numeroVisiteur },
    });
    if (!existing) {
      return {
        success: false,
        message: 'Suppression échouée (visiteur introuvable).',
      };
    }

    await this.repo.remove(existing);
    return {
      success: true,
      message: 'Suppression réussie.',
      data: null,
    };
  }

  async bilan(): Promise<BilanResponse> {
    const all = await this.repo.find({
      order: { numeroVisiteur: 'ASC' },
    });

    const tarifs = all.map((v) => v.nombreJours * v.tarifJournalier);
    const total = tarifs.reduce((sum, t) => sum + t, 0);
    const min = tarifs.length ? Math.min(...tarifs) : null;
    const max = tarifs.length ? Math.max(...tarifs) : null;

    return {
      total,
      min,
      max,
      items: all.map((v) => ({
        numeroVisiteur: v.numeroVisiteur,
        nom: v.nom,
        tarif: v.nombreJours * v.tarifJournalier,
      })),
    };
  }
}
