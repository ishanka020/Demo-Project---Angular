import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],   // ✅ Only FormsModule now
  templateUrl: './task.html',
  styleUrls: ['./task.css']
})
export class Task {
  tasks: string[] = ['Learn Angular', 'Build a project', 'Practice daily'];
  newTask: string = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
