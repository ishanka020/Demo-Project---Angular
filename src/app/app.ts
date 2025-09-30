import { Component } from '@angular/core';
import { Task } from './task/task';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Task],   
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'my-task-app';
}
