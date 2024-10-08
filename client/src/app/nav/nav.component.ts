import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  // loggedIn = false;
  username = '';

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
