import { Hero } from '../heroes.model';

export class AddHero {
  static readonly type = '[Hero] Add Hero';

  constructor(public payload: string) {}
}

export class LoadHeroes {
  static readonly type = '[Hero] Load heroes';

  constructor() {}
}

export class LoadHero {
  static readonly type = '[Hero] Load heroes';

  constructor(public payload: string) {}
}

export class RemoveHero {
  static readonly type = '[Hero] Remove hero';

  constructor(public payload: string) {}
}

export class ModifyHero {
  static readonly type = '[Hero] Change Hero';

  constructor(public payload: Hero) {}

}
