import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { HeroesState } from '../../../../store/heroes.state';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../../../../heroes.model';
import { LoadHeroes } from '../../../../store/heroes.actions';
import { debounceTime, distinctUntilChanged, flatMap, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @Select(HeroesState.heroesList) public $heroesList: Observable<Array<Hero>>;
  private searchQuery = new Subject<string>();
  heroes$: Observable<Array<Hero>>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.heroes$ = this.searchQuery
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(res => {
          return this.$heroesList
            .pipe(map(hero => {
              return this.filterItems(res, hero);
            }));
        }));
    this.store.dispatch(new LoadHeroes());
  }

  filterItems(query: string, heroesName: Array<Hero>): Array<Hero> {
    return heroesName.filter((el) => {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  searchHero(value: string): void {
    this.searchQuery.next(value);
  }
}
