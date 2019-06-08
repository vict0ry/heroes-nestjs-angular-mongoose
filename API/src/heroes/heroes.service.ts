import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IHero } from './hero.interface';
import { HeroDTO } from './HeroDTO';

@Injectable()
export class HeroesService {
  constructor(@InjectModel('Hero') private readonly heroModel: Model<IHero>) {

  }

  async add(CreateHeroDto: HeroDTO): Promise<IHero> {
    const createdHero = new this.heroModel(CreateHeroDto);
    return await createdHero.save();
  }

  async modify(id: string, updatedHero: HeroDTO): Promise<IHero> {
    return await this.heroModel.findByIdAndUpdate(id, updatedHero, { new: true }).exec();
  }

  async delete(id: string): Promise<IHero> {
    return await this.heroModel.findById(id).remove().exec();
  }

  async getHero(id: any) {
    return await this.heroModel.findById(id);
  }

  async getHeroes() {
    return await this.heroModel.find();
  }

}
