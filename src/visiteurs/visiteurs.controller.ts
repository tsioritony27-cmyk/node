import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVisiteurDto } from './dto/create-visiteur.dto';
import { UpdateVisiteurDto } from './dto/update-visiteur.dto';
import { VisiteursService } from './visiteurs.service';

@Controller('visiteurs')
export class VisiteursController {
  constructor(private readonly visiteursService: VisiteursService) {}

  @Post()
  create(@Body() dto: CreateVisiteurDto) {
    return this.visiteursService.create(dto);
  }

  @Get()
  findAll() {
    return this.visiteursService.findAll();
  }

  @Get('bilan')
  bilan() {
    return this.visiteursService.bilan();
  }

  @Patch(':numeroVisiteur')
  update(
    @Param('numeroVisiteur', ParseIntPipe) numeroVisiteur: number,
    @Body() dto: UpdateVisiteurDto,
  ) {
    return this.visiteursService.update(numeroVisiteur, dto);
  }

  @Delete(':numeroVisiteur')
  remove(@Param('numeroVisiteur', ParseIntPipe) numeroVisiteur: number) {
    return this.visiteursService.remove(numeroVisiteur);
  }
}
