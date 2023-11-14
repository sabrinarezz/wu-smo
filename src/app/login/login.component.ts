import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor( private as: AuthService, private router: Router ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { 
        validators: [Validators.required]
      })
    }
    );
  }

  onSubmit(form: NgForm) {
    this.as.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    this.router.navigate(['/add']);
  }
}
