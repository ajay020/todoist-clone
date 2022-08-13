import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {
    this.auth.onAuthStateChanged(user =>{
        if(user){
            // user is loggedin
            console.log(user);
        }else{
            // user is logout
            // localStorage.removeItem('user');
            // console.log(user)
        }
    })
  }

  signup(userData: any) {
    const { username, email, password } = userData;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.setUserData(user, username);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        console.log(errorMessage);
      });
  }

  async login(userData: { email: string; password: string }) {
    try {
        let userCredentials = await this.auth.signInWithEmailAndPassword(
            userData.email,
            userData.password
          );    

        let user = userCredentials.user!;
        this.fireStore
            .doc('users/' + user.uid)
            .get()
            .subscribe(shot =>{
                let result = shot.data();
                localStorage.setItem('user', JSON.stringify(result));
                this.router.navigate(['home']);
            })
    } catch (error) {
        console.log(error);
    }
  }

  setUserData(user: any, username: string) {
    const userRef = this.fireStore.doc('users/' + user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      photoURL: user.photoURL,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    userRef.set(userData, { merge: true });
  }

  async logout() {
    await this.auth.signOut();
    console.log("removing user.............22222222");
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ;
  }
}
