import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="https://demeter.vn" target="_blank">Demeter Team</a></b> 2017</span>
  `,
})
export class FooterComponent {
}
