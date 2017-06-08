import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: any;
  register: any = {};
  submitClicked: boolean = false;
  formSubmitted: boolean = false;

  constructor(private router: Router,
              private coreService: CoreService) { }

  ngOnInit() {
  }

  startRegister(event) {
    this.submitClicked = true;
    if (this.registerForm.form.valid) {
      this.formSubmitted = true;
      this.coreService.register(this.register).subscribe(() => {
      }, () => {
        this.formSubmitted = false;
      });
    }
  }

}
