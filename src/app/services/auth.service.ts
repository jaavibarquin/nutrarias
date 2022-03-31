import { RoleValidator } from 'src/app/auth/helpers/roleValidator';
import { UserI } from 'src/app/shared/models/user.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService extends RoleValidator {
  public user$: Observable<UserI>;
  public userData: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<UserI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    this.userData = afAuth.authState;
  }

  async login(email: string, password: string): Promise<UserI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateData(user);
      return user;
    } catch (error) {
      window.alert(error);
    }
  }

  async register(
    email: string,
    password: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    birthdate: Date,
    phone: string
  ): Promise<UserI> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userRef: AngularFirestoreDocument<UserI> = this.afs.doc(
        `users/${user.uid}`
      );
      const data: UserI = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        dateOfBirth: birthdate,
        phoneNumber: phone,
        role: 'BASICO',
      };
      this.sendVerifEmail();
      userRef.set(data, { merge: true });
      return user;
    } catch (error) {
      window.alert(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      window.alert(error);
    }
  }

  async sendVerifEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async recoverPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      window.alert(error);
    }
  }

  async logInWithGoogle(): Promise<UserI> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateData(user);
      return user;
    } catch (error) {
      window.alert(error);
    }
  }

  private updateData(user: UserI) {
    const userRef: AngularFirestoreDocument<UserI> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: UserI = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
    };
    return userRef.set(data, { merge: true });
  }
}
