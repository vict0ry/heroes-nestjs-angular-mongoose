import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarComponent,
    HeroCardComponent,
    ToastComponent,
    NavigationComponent,
  ],
  exports: [
    NavbarComponent,
    HeroCardComponent,
    ReactiveFormsModule,
    ToastComponent,
    NavigationComponent
  ]
})
export class SharedModule {}
