import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { AuthService } from 'src/app/services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HamburgerComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService); // Get instance of AuthService
    // fixture.detectChanges();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Western Union logo and text in Navbar brand', () => {
    const navbarBrandElement = fixture.debugElement.nativeElement.querySelector('.navbar-brand');
    expect(navbarBrandElement).toBeTruthy();
    expect(navbarBrandElement.textContent).toContain('Western Union');
  });
 
  it('should contain navigation links', () => {
    const navLinks = fixture.debugElement.nativeElement.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(4); // Check if all four navigation links exist
  });
 
  it('should render a Logout button', () => {
    const logoutButton = fixture.debugElement.nativeElement.querySelector('.logout button');
    expect(logoutButton).toBeTruthy();
  });
 
  it('should call logout() method when Logout button is clicked', () => {
    spyOn(authService, 'logout'); // Spy on the logout method of AuthService
    const logoutButton = fixture.debugElement.nativeElement.querySelector('.logout button');
    logoutButton.click(); // Simulate button click
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should have a dark background color', () => {
    const navbar = fixture.debugElement.nativeElement.querySelector('.navbar');
    expect(window.getComputedStyle(navbar).getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0)'); // Adjust this based on your expected color
  });
 
  it('should have a bottom border and body border', () => {
    const navbar = fixture.debugElement.nativeElement.querySelector('.navbar');
    const borderBottom = window.getComputedStyle(navbar).getPropertyValue('border-bottom');
    const borderBody = window.getComputedStyle(navbar).getPropertyValue('border-body');
 
    expect(borderBottom).not.toBe('none');
    expect(borderBody).not.toBe('none');
  });

  it('should inject AuthService', () => {
    const authService = TestBed.inject(AuthService);
    expect(authService).toBeTruthy();
  });
 
  it('should have AuthService instance in the component', () => {
    const authService = TestBed.inject(AuthService);
    expect(component['as']).toEqual(authService);
  });
});
