import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface ActivityLog {
  action: string;
  timestamp: string;
  details?: string;
}

interface TaskArray {
  text: string;
  completed: boolean;
  isEditing?: boolean;
  id: number;
  notes?: string[];
  pdfs?: { name: string; data: string }[];
  history?: ActivityLog[];
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
  newNote: string = '';

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

    if (!this.task.pdfs) {
      this.task.pdfs = [];
    }

    if (!this.task.history) {
      this.task.history = [];
      this.task.history.push({
        action: 'Task Created',
        timestamp: new Date().toISOString(),
      });
      this.saveTask();
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

  addNote() {
    if (this.newNote.trim() !== '') {
      this.task.notes?.push(this.newNote);
      this.newNote = '';
      this.saveTask();
    }
  }

  removeNote(index: number) {
    this.task.notes?.splice(index, 1);
    this.saveTask();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result as string;
        this.task.pdfs?.push({ name: file.name, data: fileData });
        this.saveTask();
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  viewFile(pdf: { name: string; data: string }) {
    const fileURL = pdf.data;
    window.open(fileURL, '_blank');
  }

  removeFile(index: number) {
    this.task.pdfs?.splice(index, 1);
    this.saveTask();
  }

  addHistory(action: string, details?: string) {
    this.task.history?.push({
      action,
      timestamp: new Date().toISOString(),
      details,
    });
    this.saveTask();
  }
}
