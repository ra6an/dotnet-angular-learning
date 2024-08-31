import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  register() {
    // this.accountService.register(this.model);
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (err) => console.log(err),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
