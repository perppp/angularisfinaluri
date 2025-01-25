import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}

  // Mock tasks data with more information
  private tasks = [
    {
      id: 1,
      title: 'Design New Homepage',
      description: 'Create a new, modern homepage design with a mobile-first approach.',
      completed: false,
      priority: 'High',
      dueDate: '2025-02-15',
      assignee: 'John Doe',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Implement User Authentication',
      description: 'Set up login and registration functionality with JWT authentication.',
      completed: false,
      priority: 'Medium',
      dueDate: '2025-02-20',
      assignee: 'Jane Smith',
      status: 'Not Started',
    },
    {
      id: 3,
      title: 'Fix Bugs in Dashboard',
      description: 'Resolve layout issues and fix broken links in the user dashboard.',
      completed: false,
      priority: 'Low',
      dueDate: '2025-03-01',
      assignee: 'Michael Brown',
      status: 'Pending',
    },
    {
      id: 4,
      title: 'Setup Payment Gateway',
      description: 'Integrate Stripe API for handling payments in the e-commerce section.',
      completed: true,
      priority: 'High',
      dueDate: '2025-01-30',
      assignee: 'Sarah Johnson',
      status: 'Completed',
    },
    {
      id: 5,
      title: 'Write API Documentation',
      description: 'Document the REST API endpoints for internal use and external developers.',
      completed: false,
      priority: 'Medium',
      dueDate: '2025-02-10',
      assignee: 'Emily Davis',
      status: 'In Progress',
    },
    {
      id: 6,
      title: 'Conduct User Testing',
      description: 'Test the new features with users and gather feedback for improvements.',
      completed: false,
      priority: 'Medium',
      dueDate: '2025-03-05',
      assignee: 'Chris Evans',
      status: 'Not Started',
    },
  ];

  // Simulate fetching tasks from a mock database
  getTasks(): Observable<any[]> {
    return of(this.tasks);  // Return an observable with mock data
  }

  // Generate task reports
  generateReport(): Observable<any> {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(task => task.completed).length;
    const pendingTasks = this.tasks.filter(task => !task.completed).length;

    const tasksByPriority = {
      high: this.tasks.filter(task => task.priority === 'High').length,
      medium: this.tasks.filter(task => task.priority === 'Medium').length,
      low: this.tasks.filter(task => task.priority === 'Low').length,
    };

    const tasksByStatus = {
      notStarted: this.tasks.filter(task => task.status === 'Not Started').length,
      inProgress: this.tasks.filter(task => task.status === 'In Progress').length,
      pending: this.tasks.filter(task => task.status === 'Pending').length,
      completed: completedTasks,
    };

    const report = {
      totalTasks,
      completedTasks,
      pendingTasks,
      tasksByPriority,
      tasksByStatus,
    };

    return of(report);  // Return an observable with the report data
  }
}
