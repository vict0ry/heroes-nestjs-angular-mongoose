import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AddHero, LoadHeroes, RemoveHero } from '../../store/heroes.actions';
import { HeroesState } from '../../store/heroes.state';
import { Observable } from 'rxjs';
import { Hero } from '../../heroes.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @Select(HeroesState.heroesList) public $heroesList: Observable<Array<Hero>>;

  heroName: string;
  selectedHero: Hero;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadHeroes());
  }

  selectHero(hero): void {
    this.selectedHero = hero;
  }

  addHero(): void {
    this.store.dispatch(new AddHero(this.heroName));
  }

  removeHero($event, id: string) {
    $event.stopPropagation();
    this.store.dispatch(new RemoveHero(id));
  }
}
