import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TaskArray{
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],   
  templateUrl: './task.html',
  styleUrls: ['./task.css']
})
export class Task {
  tasks: TaskArray[] = [
    
    {text:'Learn Angular', completed:false},
    {text:'Build a project', completed:false},
    {text:'Practice daily', completed:false},
  ]
  newTask: string = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({text:this.newTask, completed:false});
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  toggleTask(index:number){
    this.tasks[index].completed =! this.tasks[index].completed;
  }
}
