import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'agribook-home-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  recentSearchs: any[] = ['Bap cai', 'Ca chua'];
  constructor(private el: ElementRef,
              private store: Store<any>,
              private router: Router){ }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
