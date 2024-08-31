import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  baseUrl = 'https://localhost:5001/api/';
  registerMode = false;
  loginMode = false;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

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

  getUsers() {
    this.http.get(`${this.baseUrl}users`).subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.log(err),
      complete: () => console.log('Request has completed.'),
    });
  }
}
