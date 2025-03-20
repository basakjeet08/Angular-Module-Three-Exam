import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/Models/User/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css'],
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
}
