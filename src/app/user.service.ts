import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore)  {
  }

   save(user: firebase.User){
     this.db.collection('users').doc(user.uid).update({
       name: user.displayName,
       email: user.email
     });
   }

   get(uid: string){
     return this.db.collection<AppUser>('users').doc(uid).valueChanges();
   }
}
