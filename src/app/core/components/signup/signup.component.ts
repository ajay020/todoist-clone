import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ProjectService } from './../../../shared/services/project.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    isLoading= false;

  constructor(
    private router: Router,
     private authService: AuthService,
     private projectService: ProjectService) { }

  ngOnInit(): void {
    let projectTitles = ["Work", "Personal", "School"];
    projectTitles.forEach(title =>{
        this.projectService.create(title);
    })
  }

  signup(formData: any){
    this.isLoading = true;
    let {username} = formData;

    this.authService.signup(formData)
        .then((userCredential) => {
            const user = userCredential.user;
            this.authService.setUserData(user, username);
            this.router.navigate(['']);
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            this.isLoading = false;
            console.log(errorMessage);
        });

  }

}
