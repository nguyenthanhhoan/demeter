import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

declare var $: any;

@Component({
  selector: 'demeter-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  hasSidebar: string;
  isSidebarOpen = true;

  constructor(private router: Router,
              private location: Location,
              private tokenService: Angular2TokenService) {
  }

  ngOnInit() {
  }

  logout(){
    this.tokenService.signOut().subscribe(
      res => {
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.router.navigate(['/auth/login']);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    $('.sidebar').toggleClass('show');
    $('.user-side').toggleClass('side-bar-open');
  }

  back() {
    this.location.back();
  }

}
