import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface TaskArray {
  text: string;
  completed: boolean;
  isEditing?: boolean;
  id: number;
  notes?: string[];
}

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css'],
})
export class TaskDetailComponent implements OnInit {
  task!: TaskArray;
  taskId!: number;
  newNote: string ='';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    const tasks: TaskArray[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    this.task = tasks.find((t) => t.id === this.taskId) as TaskArray;

    if (!this.task) {
      this.router.navigate(['/tasks']);
    }

    if (!this.task.notes) {
      this.task.notes = [];
    }
  }

  toggleTask() {
    this.task.completed = !this.task.completed;
    this.saveTask();
  }

  saveTask() {
    const tasks: TaskArray[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((t) => t.id === this.task.id);
    if (index !== -1) {
      tasks[index] = this.task;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  addNote(){
    if(this.newNote.trim() !==''){
        this.task.notes?.push(this.newNote);
        this.newNote='';
        this.saveTask();
    }
  }

  removeNote(index: number) {
    this.task.notes?.splice(index, 1);
    this.saveTask();
  }
}
