import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

declare var $: any;

@Component({
  selector: 'demeter-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
    if (window.innerWidth < 1000) {
      this.isSidebarOpen = false;
      $('.sidebar').removeClass('show');
      $('.user-side').removeClass('side-bar-open');
    } else {
      $('.sidebar').addClass('show');
      $('.user-side').addClass('side-bar-open');
    }
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
