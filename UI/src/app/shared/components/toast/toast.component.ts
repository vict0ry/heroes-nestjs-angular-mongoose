import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { AddHero, ModifyHero, RemoveHero } from '../../../store/heroes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @Input() length: number = 4000;

  constructor(private actions$: Actions) { }

  ngOnInit() {
    this.subscription = this.actions$
      .pipe(ofActionSuccessful(ModifyHero, AddHero, RemoveHero))
      .subscribe(_ => this.runToast());
  }

  runToast(): void {
    const x = document.getElementById('toast');
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, this.length);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
