import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor( private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
   }


  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void{
    this.afAuth.signOut();
  }

  get appUser$(){
    return this.user$
      .pipe(switchMap(user => {
        if (user) {
         return this.userService.get(user.uid);
        }

        return (of(null));
      }));
  }
}
