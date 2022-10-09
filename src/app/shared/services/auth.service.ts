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
            // console.log(user);
        }else{
            // user is logout
            // localStorage.removeItem('user');
            // console.log(user)
        }
    })
  }

  signup(userData: any) {
    const { email, password } = userData;

    return this.auth.createUserWithEmailAndPassword(email, password);
      
  }

   login(userData: { email: string; password: string }) {
    return this.auth.signInWithEmailAndPassword(
                    userData.email,
                    userData.password
                );    

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
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ;
  }

  get userId(){
    let user = JSON.parse(localStorage.getItem('user')!);
    return user ? user.uid : null;
  }
}
