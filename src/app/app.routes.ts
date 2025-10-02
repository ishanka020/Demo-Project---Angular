import { Routes } from '@angular/router';
import { Task } from './task/task';
import { TaskDetailComponent } from './task-detail/task-detail';

export const routes: Routes = [
  { path: 'tasks', component: Task },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
];
