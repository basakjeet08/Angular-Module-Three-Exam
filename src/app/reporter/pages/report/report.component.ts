import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { IncidentService } from 'src/app/shared/services/incident.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  // This is the user data for the component
  userInput = {
    id: '',
    title: '',
    priority: '',
    reportedBy: '',
    status: 'OPEN',
  };

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the required dependencies
  constructor(
    private incidentService: IncidentService,
    private location: Location
  ) {}

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the API
    this.incidentService.createIncident(this.userInput).subscribe({
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
