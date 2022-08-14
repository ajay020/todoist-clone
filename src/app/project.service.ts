import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private authService: AuthService,
    private fireAuth:  AngularFireAuth,
    private firestore: AngularFirestore) { }

  async create(project : string){
    let uid  = this.authService.userId;
    const docref =  this.firestore.collection('projects/'+ uid + '/project' );
    docref.add(project);
  }
 
  addItem(item : Item){
    let uid  = this.authService.userId;
    const collref =  this.firestore.collection('projects/'+ uid + "/items");
    collref.add(item);
  }

}
