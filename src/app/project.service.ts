import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Item } from './models/item';
import { map, of, pipe, switchMap } from 'rxjs';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private authService: AuthService,
    private fireAuth:  AngularFireAuth,
    private firestore: AngularFirestore) { }

    getAllProjects(){
        let uid  = this.authService.userId;
        return this.firestore.collection('projects/' +uid + '/userProjects')
                .snapshotChanges()
                .pipe(map(data => {
                    let list: any[] = [];
                    data.forEach(x => {
                        let d = x.payload.doc.data() as {};
                        let key = x.payload.doc.id;

                        list.push({...d, key});
                    })
                    return list;
                }),
                )
               
    }


  async create(name : string){
    let uid = this.authService.userId;

    let project = {
        user_id: uid,
        name,
        created_at: new Date().getTime().toString()
    }

    this.firestore.collection('projects/' +uid + '/userProjects'  ). add(project);
  }
 
  addItem(item : Item){
    let uid  = this.authService.userId;
    const collref =  this.firestore.collection('projects/'+ uid + "/items");
    collref.add(item);
  }

}
