import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    isLoading= false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(formData: any){
    this.isLoading = true;
    this.authService.signup(formData);
  }

}
