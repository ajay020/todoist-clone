import { Injectable } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProjectService } from './project.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = [
    {
      id: '1',
      name: 'Deep work',
      description: 'Description 1',
      dueDate: '31 Aug',
    },
    {
      id: '2',
      name: 'Feat is mind killer',
      description: 'Let is pass and after it has gone see its path.',
      dueDate: 'This moment',
    },
  ];
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  getAllTasks(){
    const uid = this.authService.userId; 
    return this.firestore.collection('items/'+ uid + '/userItems')
        .snapshotChanges()
        .pipe(map(snapshot =>{
            let list : any[] = [];
            snapshot.forEach(doc =>{
                let data = doc.payload.doc.data() as {};
                let id = doc.payload.doc.id;
                list.push( { key: id, ...data  });
            })
            return list;
        }))
  }

  addTask(task: any, projectId: any) {
    const uid = this.authService.userId;
    task.user_id = uid;

    this.firestore
      .collection('items/'+ uid + '/userItems')
      .add(task);
  }

  update(task: any) {
    // console.log(task);
    this.firestore.collection('items/'+ task.user_id +"/userItems/")
        .doc(task.key).set(task);
  }

  delete(task: any) {
    // console.log(task);
    this.firestore.collection('items/'+ task.user_id +"/userItems/")
    .doc(task.key).delete();
  }
}
