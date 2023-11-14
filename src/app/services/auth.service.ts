import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<Boolean>();

  private user!: User;
  private isAuth = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( user => {
      if(user) {
        this.isAuth = true;
        this.authChange.next(true);
      } else {
        this.router.navigate(['/login']);
        this.isAuth = false;
        this.authChange.next(false);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword( authData.email, authData.password )
    .then( result => {
      console.log(result);
      // this.ss.loadingStateChanged.next(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    })
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
    // this.user = null;
  }

  isAuthen() {
    return this.isAuth;
  }
}
