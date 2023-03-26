import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, map, Observable } from 'rxjs';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean> = new Observable<boolean>();
  public isAuthenticatedWithDelay$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
  ) { 
    this.users = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(
      map((value) => value != null)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
  }

  public async createUser(userData: IUser){
    if(!userData.email || !userData.password)
      throw new Error("Email/Password not provided!");

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if(!userCred.user)
      throw new Error("User can't be found!");

    await this.users
    .doc(userCred.user.uid)
    .set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    });

    await userCred.user.updateProfile({
      displayName: userData.name
    });
  }
}
