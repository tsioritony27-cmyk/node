import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisiteursModule } from './visiteurs/visiteurs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    VisiteursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
