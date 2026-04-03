import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisiteurEntity } from './visiteur.entity';
import { VisiteursController } from './visiteurs.controller';
import { VisiteursService } from './visiteurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisiteurEntity])],
  controllers: [VisiteursController],
  providers: [VisiteursService],
})
export class VisiteursModule {}
