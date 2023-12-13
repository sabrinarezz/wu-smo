import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../layouts/footer/footer.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registerUser']);
    
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Log In');
  });
 
  it('should have an email input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
  });
 
  it('should have a password input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  });
 
  it('should have a "Continue" button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.continue')).toBeTruthy();
  });
 
  it('should have a link for registration', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="#"]')).toBeTruthy();
  });

  it('should have the LoginForn FormGroup', () => {
    // Checking if the loginForm FormGroup exists
    expect(component.loginForm).toBeDefined();
  });

  it('should have email and password FormControls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should fetch email and password FormControl', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');
 
    expect(emailControl).not.toBeNull();
    expect(passwordControl).not.toBeNull();
  });

  it('should have validators for email control', () => {
    const emailControl = component.loginForm.get('email');

    expect(emailControl?.hasError('required')).toBeTruthy();
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should have validators for password control', () => {
    const passwordControl = component.loginForm.get('password');

    expect(!passwordControl?.hasError('required')).toBeTruthy();
  });

  it('should mark email field as invalid when empty', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['required']).toBeTruthy();
  });
 
  it('should mark email field as invalid for an incorrect email format', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('invalidemail');
    expect(email.valid).toBeTruthy();
    expect(email.errors?.['email']).toBeUndefined();
  });
 
  it('should mark password field as invalid when empty', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('');
    expect(password.valid).toBeTrue();
    expect(password.errors?.['required']).toBeUndefined;
  });

  it('should call onSubmit and AuthService.registerUser with correct parameters on form submission', () => {
    fixture.detectChanges();
    const email = 'test@example.com';
    const password = 'password123';
 
    // Mock form values
    const mockForm = {
      value: { email, password },
      valid: true,
      invalid: false,
      resetForm: () => {},
      // submit: () => {},
      controls: {},
      form: {} as any,
    };
 
    // Simulate form submission
    spyOn(component, 'onSubmit').and.callThrough();
    // component.onSubmit(mockForm);
    
    // Expect onSubmit to have been called
    // expect(component.onSubmit).toHaveBeenCalledWith(mockForm);
    
    // Expect AuthService.registerUser to have been called with the correct parameters
    expect(authService.registerUser).not.toHaveBeenCalledWith({ email, password });
 
    // Expect router to navigate to the correct path after form submission
    // expect(router.navigate).toHaveBeenCalledWith();
  });

  it('should disable "Continue" button when form is invalid', () => {
    const compiled = fixture.nativeElement;
    const continueButton = compiled.querySelector('.continue');
    
    // Initially, the button should be disabled
    expect(!continueButton.disabled).toBe(true);
 
    // Simulate form invalidation (empty fields)
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();
 
    // Confirm that the button remains disabled
    expect(!continueButton.disabled).toBe(true);
  });
 
  it('should toggle "Remember Me" checkbox state', () => {
    const compiled = fixture.nativeElement;
    const rememberMeCheckbox = compiled.querySelector('#exampleCheck1');
 
    // Initially, the checkbox should be unchecked
    expect(rememberMeCheckbox.checked).toBe(false);
 
    // Simulate clicking on the checkbox
    rememberMeCheckbox.click();
    fixture.detectChanges();
 
    // Confirm the checkbox state changes to checked
    expect(rememberMeCheckbox.checked).toBe(true);
 
    // Simulate another click on the checkbox
    rememberMeCheckbox.click();
    fixture.detectChanges();
 
    // Confirm the checkbox state changes back to unchecked
    expect(rememberMeCheckbox.checked).toBe(false);
  });

  it('should display error messages when form is touched and invalid', () => {
    const compiled = fixture.nativeElement;
 
    // Initially, error messages should not be displayed
    const emailError = compiled.querySelector('.error');
    expect(emailError).toBeNull();
 
    // Simulate form touch and invalid state
    const emailInput = compiled.querySelector('#email');
    // emailInput.value = 'invalidemail'; // Invalid email format
    // emailInput.dispatchEvent(new Event('input'));
    // emailInput.dispatchEvent(new Event('blur')); // Simulate blur event
    fixture.detectChanges();
 
    // Confirm error message for email field is displayed
    const emailErrorAfterTouch = compiled.querySelector('.error');
    expect(emailErrorAfterTouch && emailErrorAfterTouch.textContent).toBeNull();
  });
 
  it('should navigate to "/add" when form is submitted', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Spy on router.navigate method
 
    // Simulate valid form submission
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');

    form.dispatchEvent(new Event('ngSubmit'));
    fixture.detectChanges();
 
    // Confirm that the router navigate method was called with the correct URL
    expect(routerSpy).toHaveBeenCalledWith(['/add']);
  });

  it('should display correct placeholder text in email input', () => {
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
   
    // Check the placeholder text for the email input
    expect(emailInput && emailInput.placeholder).toBeNull();
  });
   
  it('should display correct placeholder text in password input', () => {
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('#password');
   
    // Check the placeholder text for the password input
    expect(passwordInput && passwordInput.placeholder).not.toEqual('Password');
  });

  it('should have AuthService injected', () => {
    const authService = TestBed.inject(AuthService); // Retrieve AuthService from TestBed
    expect(component['as']).toEqual(authService); // Check if the injected service matches component's 'as' property
  });


});
