import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirect = false;
  private users: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean> = new Observable<boolean>();
  public isAuthenticatedWithDelay$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.users = db.collection('users');
    this.isAuthenticated$ = afAuth.user.pipe(
      map((value) => value != null)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(e => this.route.firstChild),
        switchMap(route => route?.data ?? of({}))
      ).subscribe(data => {
        this.redirect = data?.['authOnly'] ?? false;
      });
  }

  public async createUser(userData: IUser){
    if(!userData.email || !userData.password)
      throw new Error("Email/Password not provided!");

    const userCred = await this.afAuth.createUserWithEmailAndPassword(
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

  public async logout($event?: Event){
    $event?.preventDefault();
    await this.afAuth.signOut();
    if(this.redirect)
      await this.router.navigateByUrl('/');
  }
}
