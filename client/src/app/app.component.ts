import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/';
  title = 'Dating App';
  // users: any;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('token');
    if (!userString) return;

    const token: string = JSON.parse(userString);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<User>(`${this.baseUrl}account/me`, { headers }).subscribe({
      next: (res: User) => {
        this.accountService.setLoggedIn(true);
        this.accountService.setUsername(res.username);
        this.accountService.setCurrentUser(res);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Authentication completed!'),
    });
  }
}
