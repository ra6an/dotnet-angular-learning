import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // baseUrl = environment.apiUrl;
  registerMode = false;
  loginMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancleRegisterToggle(event: boolean) {
    this.registerMode = event;
  }

  loginToggle() {
    this.loginMode = !this.loginMode;
  }

  cancleLoginToggle(event: boolean) {
    this.loginMode = event;
  }
}
