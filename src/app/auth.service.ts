import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  login() {
    const popup = window.open(
      'redirect_function_url',
      '_blank',
      'height=700,width=800'
    );
  }

  signIn(token) {
    return this.afAuth.auth
      .signInWithCustomToken(token)
      .then(() => window.close());
  }

  signout() {
    this.afAuth.auth.signOut();
  }
}
