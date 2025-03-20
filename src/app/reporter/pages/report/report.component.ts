import { Location } from '@angular/common';
import { Component } from '@angular/core';

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
  constructor(private location: Location) {}

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    console.log(this.userInput);
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
