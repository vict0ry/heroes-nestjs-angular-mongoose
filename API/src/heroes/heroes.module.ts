import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSchema } from './hero.schema';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hero', schema: HeroSchema },
    ]),
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [
    HeroesService,
    MongooseModule.forFeature([
      { name: 'Hero', schema: HeroSchema },
    ]),
  ],
})
export class HeroesModule {}
