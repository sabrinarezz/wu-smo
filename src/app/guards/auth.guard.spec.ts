import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  // const executeGuard: CanActivateFn = (...guardParameters) => 
  //     // TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));
  //     console.log(guardParameters);

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  // });           

  // it('should be created', () => {
  //   expect(executeGuard).toBeTruthy();
  // });
  let guard: AuthGuard;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login','logout']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: mockAuthService },
        // AuthService,
        { provide: Router, useValue: mockRouter }
      ],
      // imports:[HttpClientModule]
    });
    guard = TestBed.inject(AuthGuard);
  });
  
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });  
  })

  