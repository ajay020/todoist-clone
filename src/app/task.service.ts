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
                list.push(doc.payload.doc.data());
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
    console.log(task);
    let index = this.tasks.findIndex((t) => t.id === task.id);
    if (index > -1) {
      this.tasks[index] = { ...task };
    }

    console.log(this.tasks);
  }

  delete(taskId: any) {
    let index = this.tasks.findIndex((task) => task.id === taskId);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
