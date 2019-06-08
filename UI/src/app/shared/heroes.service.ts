import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants';
import { SharedModule } from './shared.module';
import { Observable } from 'rxjs';
import { Hero } from '../heroes.model';

@Injectable({
  providedIn: SharedModule
})
export class HeroesService {
  private heroServiceUrl: string = `${BASE_URL}/heroes`;

  constructor(private http: HttpClient) { }

  saveHero(data): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroServiceUrl}/add`, data);
  }

  loadHeroes(): Observable<Array<Hero>> {
    return this.http.get<Array<Hero>>(this.heroServiceUrl);
  }

  updateHero(data: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroServiceUrl}/${data._id}`, data);
  }

  loadHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${BASE_URL}/heroes/${id}`);
  }

  deleteHero(id: string) {
    return this.http.delete<Hero>(`${this.heroServiceUrl}/${id}`);
  }
}
