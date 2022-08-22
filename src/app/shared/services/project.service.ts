import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';


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
 
  delete(projectId: any){
    let uid  = this.authService.userId;
    this.firestore.doc('projects/' + uid + "/userProjects/" + projectId)
    .delete()
    .then( () =>{
        this.firestore.collection('items/' + uid + "/userItems", ref => ref.where("project_id", "==", projectId ))
        .get()
        .subscribe(data =>{ 
            data.forEach(d => {
                // console.log(d.ref.path) 
                d.ref.delete();
            });
        });
    })
    .catch(error =>{
        console.log(error)
    })
    
  }

  getProjectCount(){
    return this.getAllProjects().pipe(map(value => {
        return value.length;
    }));
  }

}