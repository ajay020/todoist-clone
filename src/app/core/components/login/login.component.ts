import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isLoading = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user') || undefined;
    if(user){
        this.router.navigate(['home']);
    }
  }

  async login(formData: any){
    this.isLoading = true;
    this.auth.login(formData)
  }
}
