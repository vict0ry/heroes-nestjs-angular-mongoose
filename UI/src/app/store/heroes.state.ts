import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HeroesService } from '../shared/heroes.service';
import { AddHero, LoadHero, LoadHeroes, ModifyHero, RemoveHero } from './heroes.actions';
import { mergeMap, tap } from 'rxjs/operators';
import { Hero } from '../heroes.model';

export class HeroesStateModel {
  heroes: Array<Hero>;
}

const defaultState: HeroesStateModel = {
  heroes: []
};

@State<HeroesStateModel>({
  name: 'auth',
  defaults: defaultState
})
export class HeroesState {
  constructor(private heroesService: HeroesService) {}

  @Selector()
  static heroesList(state: HeroesStateModel): Array<Hero> {
    return state.heroes;
  }

  @Action(RemoveHero)
  deleteHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: RemoveHero) {
    return this.heroesService.deleteHero(payload)
      .pipe(tap((heroes => {
        patchState({
          heroes: getState().heroes.filter(hero => hero._id !== payload)
        });
      })));
  }

  @Action(AddHero)
  addHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: AddHero) {
    return this.heroesService.saveHero({name: payload})
      .pipe(tap((hero => {
        patchState({
          heroes: [...getState().heroes, hero]
        });
      })));
  }

  @Action(ModifyHero)
  modify({patchState, getState}: StateContext<HeroesStateModel>, {payload}: ModifyHero) {
    return this.heroesService.updateHero(payload)
      .pipe(tap((hero => {
        patchState({
          heroes: [...getState().heroes.map(mappedHero => {
            if (mappedHero._id === hero._id) {
              mappedHero = hero;
            }
            return mappedHero;
          })],
        });
      })));
  }

  @Action(LoadHeroes)
  load({patchState, dispatch, getState}: StateContext<HeroesStateModel>) {
    return this.heroesService.loadHeroes()
      .pipe(tap((heroes => {
        // initial values :)
        // todo: add bulk api
        if (heroes.length === 0) {
          dispatch(new AddHero('Pikachu'));
          dispatch(new AddHero('Batman'));
          dispatch(new AddHero('Spider man'));
        }
        patchState({
          heroes: heroes,
        });
      })));
  }
}
