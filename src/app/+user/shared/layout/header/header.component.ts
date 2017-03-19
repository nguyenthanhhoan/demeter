import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from "@angular/router";

import { LocalStorageService } from '../../../../shared/utils/localstorage.service';

declare var $: any;

@Component({
  selector: 'demeter-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
  }


  logout(){
    let user = this.localStorageService.remove('user');
    this.router.navigate(['/auth/login']);
  }

  back() {
    this.location.back();
  }

}
