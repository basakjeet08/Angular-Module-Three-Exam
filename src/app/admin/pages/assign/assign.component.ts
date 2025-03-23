import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { staggerAnimation } from 'src/app/shared/animations/stagger-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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

  // Injecting the necessary dependencies
  constructor(
    private userService: UserService,
    private incidentService: IncidentService,
    private toastService: ToastService,
    private loaderService: LoaderService,
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
    this.loaderService.startLoading();

    // Calling the api
    this.userService.fetchReporters().subscribe({
      // Success State
      next: (userList: User[]) => {
        this.loaderService.endLoading();
        this.userList = userList;
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is ionvoked when the user clicks on the assign button
  onAssignClick(userId: string, name: string) {
    // Setting the loading state
    this.loaderService.startLoading();

    this.incidentService
      .assignReporter(this.incidentId, name, userId)
      .subscribe({
        // Success State
        next: () => {
          this.loaderService.endLoading();
          this.location.back();
        },

        // Error state
        error: (error: Error) => {
          this.loaderService.endLoading();
          this.toastService.showToast({
            type: 'error',
            message: error.message,
          });
        },
      });
  }
}
