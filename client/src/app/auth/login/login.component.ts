import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};
  @Output() cancelLogin = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toastr.success('You logged in successfully.');
      },
      error: (err) => {
        this.toastr.error(err.error);
      },
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
