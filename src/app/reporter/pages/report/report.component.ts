import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident } from 'src/app/shared/Models/Incidents/Incident';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  // This is the user data for the component
  userInput = {
    id: '',
    title: '',
    priority: 'LOW',
    reportedBy: '',
    status: 'OPEN',
    comment: '',
  };

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the required dependencies
  constructor(
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  // Checking if this is edit mode or add mode
  ngOnInit(): void {
    const incidentId = this.route.snapshot.queryParams['incidentId'];

    if (incidentId) {
      this.isEditMode = true;
      this.userInput.id = incidentId;
      this.fetchIncidentDetails(incidentId);
    }
  }

  // This function fetches the incident Details
  fetchIncidentDetails(incidentId: string) {
    // Stating the loading state
    this.isLoading = true;

    // Calling the API
    this.incidentService.fetchIncidentById(incidentId).subscribe({
      // Success State
      next: (incident: Incident | null) => {
        this.isLoading = false;

        if (!incident) {
          alert('Wrong Incident Id Provided !!');
          this.location.back();
        } else {
          this.userInput.priority = incident.priority;
          this.userInput.reportedBy = incident.reportedBy;
          this.userInput.status = incident.status;
          this.userInput.title = incident.title;
          this.userInput.comment = incident.comment;
        }
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    // Setting the loading state
    this.isLoading = true;

    const observable = this.isEditMode
      ? this.incidentService.updateIncident(this.userInput)
      : this.incidentService.createIncident(this.userInput);

    // Calling the API
    observable.subscribe({
      // Success State
      next: () => {
        this.isLoading = false;
        this.location.back();
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the cancel button
  onCancelClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
