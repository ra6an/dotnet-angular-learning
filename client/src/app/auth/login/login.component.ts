import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};
  @Output() cancelLogin = new EventEmitter();

  constructor(private accountService: AccountService) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (err) => console.log(err),
    });
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

  logout() {
    // this.loggedIn = false;
    this.accountService.setLoggedIn(false);
  }
}
