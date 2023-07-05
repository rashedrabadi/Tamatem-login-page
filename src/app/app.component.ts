import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tamatem Project';
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    public authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailInput: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      passwordInput: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')]
      })
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(form.valid){
      this.isLoading = false;
      this.authService.login(form.value.email, form.value.password);
    }
  }
}
