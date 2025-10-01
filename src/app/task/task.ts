import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TaskArray {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.html',
  styleUrls: ['./task.css'],
})
export class Task implements OnInit {
  tasks: TaskArray[] = [
    // {text:'Learn Angular', completed:false},
    // {text:'Build a project', completed:false},
    // {text:'Practice daily', completed:false},
  ];
  newTask: string = '';

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }

  private saveTasks() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ text: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }
}
