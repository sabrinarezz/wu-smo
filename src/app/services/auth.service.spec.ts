import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
