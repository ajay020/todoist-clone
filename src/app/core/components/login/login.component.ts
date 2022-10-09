import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, tap } from 'rxjs';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoading = false;

  constructor(
    private fireStore: AngularFirestore,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user') || undefined;
    if(user){
        this.router.navigate(['home']);
    }
  }

  async login(formData: any){
    this.isLoading = true;
    try {
        
        let userCredentials = await this.auth.login(formData);
        let user = userCredentials.user!;
    
        this.fireStore
            .doc('users/' + user.uid)
            .get()
            .subscribe(
                 (snapshot) => {
                    let result = snapshot.data();
                    localStorage.setItem('user', JSON.stringify(result));
                    this.router.navigate(['']);
                },
            )
    } catch (err) {
        this.isLoading = false;
        alert(err);
        console.log(err);
    }
   
  }
}
