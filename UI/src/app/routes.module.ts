import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './pages/homepage/homepage.module#HomepageModule',
  },
  {
    path: 'heroes',
    loadChildren: './pages/heroes/heroes.module#HeroesModule',
  },
  {
    path: 'detail',
    loadChildren: './pages/detail/detail.module#DetailModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutesModule {}
