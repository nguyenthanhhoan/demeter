import {
  ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnChanges, OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent {
  constructor(private router: Router) {
  }
}
