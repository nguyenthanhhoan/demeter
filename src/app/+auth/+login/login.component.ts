import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

class User {
  constructor(
    public email: string,
    public password: string
  ) {  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  user = new User('', '');

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(event){
    event.preventDefault();
    this.authService.login(this.user);
  }

}
