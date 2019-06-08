import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Hero } from '../../heroes.model';
import { HeroesState } from '../../store/heroes.state';
import { Observable } from 'rxjs';
import { HeroesService } from '../../shared/heroes.service';
import { ModifyHero } from '../../store/heroes.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public hero: Hero = {
    name: null,
    _id: null
  };
  @Select(HeroesState.heroesList) public $heroesList: Observable<Array<Hero>>;

  constructor(protected route: ActivatedRoute,
              private store: Store,
              private location: Location,
              private heroesService: HeroesService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe()
      .subscribe(params => {
        this.heroesService.loadHero(params.get('id'))
          .subscribe(hero => this.hero = hero);
      });
  }

  updateHero(): void {
    this.store.dispatch(new ModifyHero(this.hero));
  }

  back(): void {
    this.location.back();
  }
}
