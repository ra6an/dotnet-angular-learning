import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};
  @Output() cancelLogin = new EventEmitter();

  constructor(private accountService: AccountService, private router: Router) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
      },
      error: (err) => console.log(err),
    });
  }

  cancel() {
    this.cancelLogin.emit(false);
  }

  logout() {
    this.accountService.setLoggedIn(false);
    this.router.navigateByUrl('/');
  }
}
