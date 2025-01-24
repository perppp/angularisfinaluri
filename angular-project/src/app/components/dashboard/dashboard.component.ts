import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string = ''; // Will be set from AuthService

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Get the user role from AuthService
  }

  // Navigate to user management page
  goToUserManagement() {
    this.router.navigate(['/user-management']);
  }

  // Navigate to reports page
  goToReports() {
    this.router.navigate(['/reports']);
  }

  // Navigate to groups page
  viewGroups() {
    this.router.navigate(['/groups']);
  }

  // Navigate to sessions page
  viewSessions() {
    this.router.navigate(['/sessions']);
  }
}
