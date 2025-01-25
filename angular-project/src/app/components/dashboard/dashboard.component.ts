import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service'; // Import TaskService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = []; // Array to hold tasks
  report: any = {};  // To hold report data

  constructor(
    private router: Router,
    private taskService: TaskService // Inject TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks(); // Load tasks on component initialization
    this.generateReport(); // Generate report on component initialization
  }

  // Fetch tasks from the TaskService
  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  // Generate report from the TaskService
  generateReport() {
    this.taskService.generateReport().subscribe(
      (report) => {
        this.report = report;
      },
      (error) => {
        console.error('Error generating report', error);
      }
    );
  }

  // Navigate to reports page
  goToReports() {
    this.router.navigate(['/reports']);
  }
}
