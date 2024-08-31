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

  ngOnInit(): void {
    // this.accountService.loggedIn$.subscribe((loggedIn: boolean) => {
    //   this.loggedIn = loggedIn;
    // });
    // this.accountService.username$.subscribe((username: string) => {
    //   this.username = username;
    // });
  }

  logout() {
    this.accountService.logout();
  }
}
