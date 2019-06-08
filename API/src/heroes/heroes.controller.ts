import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Response } from '@nestjs/common';
import { HeroDTO } from './HeroDTO';
import { Response as ResType } from 'express';
import { HeroesService } from './heroes.service';
import { ApiImplicitParam } from '@nestjs/swagger';

@Controller('heroes')
export class HeroesController {

  constructor(private heroesService: HeroesService) {

  }

  @Post('add')
  addHero(@Req() req, @Response() res, @Body() createHeroDTO: HeroDTO): Promise<ResType> {
    return this.heroesService.add(createHeroDTO)
      .then(hero => res.status(HttpStatus.OK).json(hero));
  }

  @Put(':id')
  @ApiImplicitParam({ name: 'id' })
  public async update(@Req() req, @Response() res, @Param('id') id, @Body() heroDTO: HeroDTO): Promise<ResType> {
    return await this.heroesService.modify(id, heroDTO)
      .then(modifiedHero => res.status(HttpStatus.OK).json(modifiedHero));
  }

  @Delete(':id')
  @ApiImplicitParam({ name: 'id' })
  public async delete(@Req() req, @Response() res, @Param('id') id): Promise<ResType> {
    return this.heroesService.delete(id).then(_ => res.status(HttpStatus.OK).json());
  }

  @Get(':id')
  @ApiImplicitParam({ name: 'id' })
  async getHero(@Response() res: ResType, @Param('id') id): Promise<ResType> {
    return await this.heroesService.getHero(id).then((resp) => {
      return res.status(HttpStatus.OK).json(resp);
    });
  }

  @Get()
  async getProfiles(@Req() req, @Response() res: ResType, @Param('id') id) {
    return await this.heroesService.getHeroes().then(heroes => {
      return res.status(HttpStatus.OK).json(heroes);
    });
  }
}
