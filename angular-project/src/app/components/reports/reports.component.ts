import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service'; // Import TaskService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  report: any = {};  // To hold the report data

  constructor(
    private router: Router,
    private taskService: TaskService // Inject TaskService
  ) {}

  ngOnInit(): void {
    this.generateReport(); // Generate report on component initialization
  }

  // Generate report from TaskService
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

  // Navigate back to the dashboard
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
