import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { AppSettings } from '../../../../../app.settings';

declare var $: any;
declare var window: any;
@Component({
  selector: 'demeter-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  hasSidebar: string;
  isSidebarOpen = true;
  isHeaderMenuOpen = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
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
        window.location = AppSettings.home_url;
      }
    );
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    $('.sidebar').toggleClass('show');
    $('.user-side').toggleClass('side-bar-open');
  }

  toggleHeaderMenu() {
    this.isHeaderMenuOpen = !this.isHeaderMenuOpen;
  }

  goToPage(name) {
    this.isHeaderMenuOpen = false;
    let segments = this.route.snapshot['_urlSegment'].segments;
    let zone_id, project_id;
    for (let index = 0; index < segments.length; index++) {
      let element = segments[index];
      if (element.path === 'project') {
        project_id = segments[index + 1].path;
      }

      if (element.path === 'zone') {
        zone_id = segments[index + 1].path;
      }
    }

    // If project_id present in url -> it's was link to zone detail page
    let url = `/user`;
    if (project_id && zone_id) {
      url += `/project/${project_id}/zone/${zone_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else if (name === 'setting') {
      url += `/project/${project_id}`;
      this.router.navigate([`${url}/${name}`]);
    } else {
      url += `/project/${project_id}`;
      alert ('This page is implementing!');
    }
  }

}
