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

  // loginForm!: FormGroup;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor( private as: AuthService, private router: Router ) {
    console.log('loginform: ', this.loginForm.invalid);
  }

  onSubmit(form: NgForm) {
    this.as.registerUser({
      email: form.value.email,
      password: form.value.password
    });
    this.router.navigate(['/add']);
  }
}
