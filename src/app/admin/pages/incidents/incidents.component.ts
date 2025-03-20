import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
})
export class IncidentsComponent implements OnInit {
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

  // Fetching the incident list
  ngOnInit(): void {
    this.fetchIncidents();
  }

  // This function fetches all the incidents
  fetchIncidents() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.incidentService.fetchIncidents().subscribe({
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

  // This function is invoked when the user clicks on the assign button
  onAssignClick(incidentId: string) {
    this.router.navigate(['../', 'assign'], {
      relativeTo: this.route,
      queryParams: {
        incidentId: incidentId,
      },
    });
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
