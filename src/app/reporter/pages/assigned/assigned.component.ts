import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css'],
})
export class AssignedComponent implements OnInit {
  // These are the data for the component
  incidentList: Incident[] = [];

  // These denote the loading and error state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Fetching the user's incident List
  ngOnInit(): void {
    this.fetchIncidents();
  }

  // This function fetches all the incidents of the current user
  fetchIncidents() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.incidentService.fetchIncidentsAssignedToCurrentUser().subscribe({
      // Success State
      next: (incidentList: Incident[]) => {
        this.isLoading = false;
        this.incidentList = incidentList;
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the update button
  onUpdateClick(incidentId: string) {
    this.router.navigate(['../', 'report'], {
      relativeTo: this.route,
      queryParams: { incidentId },
    });
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
