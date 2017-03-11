import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

class User {
  constructor(
    public email: string,
    public password: string
  ) {  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  @Input()
  user = new User('', '');

  ngOnInit() {
  }

  login(event){
    event.preventDefault();
    this.authService.login(this.user);
  }

}
