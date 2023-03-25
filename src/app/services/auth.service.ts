import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: AngularFirestoreCollection<IUser>;

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore
  ) { 
    this.users = db.collection('users');
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
