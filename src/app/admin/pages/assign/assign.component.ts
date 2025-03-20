import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { User } from 'src/app/shared/Models/User/User';
import { IncidentService } from 'src/app/shared/services/incident.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
  animations: [staggerAnimation],
})
export class AssignComponent implements OnInit {
  // These are the data for this component
  userList: User[] = [];
  incidentId: string = '';

  // These denote the loading and error state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private incidentService: IncidentService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching all the user details and the incident id passed
  ngOnInit(): void {
    this.fetchReporterList();

    this.incidentId = this.route.snapshot.queryParams['incidentId'];

    // If the incident Id is not provided
    if (!this.incidentId) {
      alert('Invalid Incident Id Passed');
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  // This function fetches the reporters list
  fetchReporterList() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.userService.fetchReporters().subscribe({
      // Success State
      next: (userList: User[]) => {
        this.isLoading = false;
        this.userList = userList;
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is ionvoked when the user clicks on the assign button
  onAssignClick(userId: string, name: string) {
    // Setting the loading state
    this.isLoading = false;

    this.incidentService
      .assignReporter(this.incidentId, name, userId)
      .subscribe({
        // Success State
        next: () => {
          this.isLoading = false;
          this.location.back();
        },

        // Error state
        error: (error: Error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
        },
      });
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
