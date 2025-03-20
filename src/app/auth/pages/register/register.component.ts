import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // This is the user data for the component
  userInput = {
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  };

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    console.log(this.userInput);
  }

  // This function is invoked when the user clicks on the go to login page button
  OnGoToLogin() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
