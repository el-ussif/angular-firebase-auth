import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CustomToaster} from '../../utils/custom-toaster';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private customToaster: CustomToaster,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', '');
      }
    })
  }
  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        localStorage.setItem('userAccessToken', result.user.za);
        this.customToaster.showSuccessMessage('auth.user-log-success');
        this.SetUserData(result.user);
        window.location.href = 'auth/configurations';
        this.ngZone.run((res) => {
        });
      }).catch((error: any) => {
        this.customToaster.showFirebaseError(error);
      })
  }

  // Sign up with email/password
  SignUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification();
    }).then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Send email verfificaiton when new user sign up
  ConfirmPasswordReset(code: any, password: any) {
  this.afAuth.confirmPasswordReset(code, password).then((response) =>{
      this.router.navigate(['/auth']);
    this.customToaster.showSuccessMessage('auth.reset-password-success');
    }).catch(error => {
      this.customToaster.showFirebaseError(error);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.customToaster.showSuccessMessage('auth.email-password-sent');
        this.router.navigate(['/auth']);
      }).catch((error: any) => {
        this.customToaster.showFirebaseError(error);
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(<string>localStorage.getItem('user'))
    } else {
      user = null;
    }
    let userAccessToken = null;
    if (user && user.stsTokenManager && user.stsTokenManager.accessToken && user.stsTokenManager.accessToken) {
      localStorage.setItem('userAccessToken', user && user.stsTokenManager && user.stsTokenManager.accessToken && user.stsTokenManager.accessToken);
      userAccessToken = localStorage.getItem('userAccessToken');
    } else {
      localStorage.setItem('userAccessToken', '');
    }
    return (user !== null && userAccessToken !== null);
  }
  // Returns true when user is looged in and email is verified
  SetUserDataInStorage(): boolean {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(<string>localStorage.getItem('user'))
    } else {
      user = null;
    }
    let userAccessToken = null;
    if (user && user.stsTokenManager && user.stsTokenManager.accessToken && user.stsTokenManager.accessToken) {
      localStorage.setItem('userAccessToken', user && user.stsTokenManager && user.stsTokenManager.accessToken && user.stsTokenManager.accessToken);
      userAccessToken = localStorage.getItem('userAccessToken');
    } else {
      localStorage.setItem('userAccessToken', '');
    }
    return (user !== null && userAccessToken !== null /* && user.emailVerified !== false */);
  }

  // Sign in with Google
  GoogleAuth() {
    // return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboards']);
        })
        this.SetUserData(result.user);
      }).catch((error: any) => {
        window.alert(error)
      })
  }

  // Auth logic to run auth providers
  RefreshToken() { }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    localStorage.setItem('userData', JSON.stringify(this.userData));
    userRef.set(userData, {
      merge: true,
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('role');
      localStorage.removeItem('userAccessToken');
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    })
  }
}
