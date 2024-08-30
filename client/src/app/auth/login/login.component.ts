import { Component } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};
  // loggedIn = false;

  constructor(private accountService: AccountService) {}

  login() {
    this.accountService.login(this.model);
    // this.accountService.login(this.model).subscribe({
    //   next: (response: User) => {
    //     console.log(response);
    //     this.accountService.setUsername(response.username);
    //     this.accountService.setLoggedIn(true);
    //   },
    //   error: (err) => console.log(err),
    // });
  }

  logout() {
    // this.loggedIn = false;
    this.accountService.setLoggedIn(false);
  }
}
