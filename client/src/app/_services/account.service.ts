import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>('');
  private currUserSubject = new BehaviorSubject<User | null>(null);

  loggedIn$ = this.loggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();
  currUserSubject$ = this.currUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    console.log('TESTIRAMO: ', model);
    this.http.post<User>(this.baseUrl + 'account/login', model).subscribe({
      next: (res: User) => {
        const user = res;
        // console.log(user);
        if (user) {
          this.usernameSubject.next(user.username);
          this.loggedInSubject.next(true);
          this.currUserSubject.next(user);
          localStorage.setItem('token', JSON.stringify(user.token));
        }
      },
      error: (err) => console.log(err),
    });
  }

  getUserData(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<User>(`${this.baseUrl}users/me`, { headers });
  }

  logout() {
    this.loggedInSubject.next(false);
    this.usernameSubject.next('');
    this.currUserSubject.next(null);
    localStorage.removeItem('token');
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedInSubject.next(loggedIn);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }

  setCurrentUser(user: User) {
    this.currUserSubject.next(user);
  }
}
