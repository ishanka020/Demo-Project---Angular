import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface TaskArray {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
  notes? : string[];
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  filter: string = 'all';

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);

        this.tasks.forEach((task, index) => {
          if (!task.id) {
            task.id = index + 1;
          }
        });
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
      const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;

      this.tasks.push({ id: newId, text: this.newTask, completed: false });
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

  get filteredTasks(): TaskArray[] {
    if (this.filter === 'active') {
      return this.tasks.filter((t) => !t.completed);
    } else if (this.filter === 'completed') {
      return this.tasks.filter((t) => t.completed);
    }
    return this.tasks;
  }

  editTask(index: number) {
    this.tasks[index].isEditing = true;
  }

  saveTask(index: number) {
    this.tasks[index].isEditing = false;
    this.saveTasks();
  }

  cancelEdit(index: number) {
    this.tasks[index].isEditing = false;
  }

  constructor(private router: Router) {}

  goToTaskDetail(taskId: number) {
    if (taskId !== undefined) {
      this.router.navigate(['/tasks', taskId]);
    } else {
      console.warn('Task ID is undefined!');
    }
  }
}
