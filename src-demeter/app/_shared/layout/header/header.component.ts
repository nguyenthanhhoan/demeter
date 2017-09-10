import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'dmt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  user = {};
  private storeSubscription: ISubscription;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('user')
    .subscribe((userModel: any) => {
      if (userModel.loaded) {
        this.user = userModel.user;
      }
    });
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
