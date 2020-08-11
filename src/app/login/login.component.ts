import { AuthService } from './../auth.service';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService) {}

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login();
  }

}
