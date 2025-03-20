import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    role: 'REPORTER',
    password: '',
    confirmPassword: '',
  };

  // These are the loading and error state variables
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    // Setting the loading state
    this.isLoading = true;

    // Calling the api
    this.authService.registerUser(this.userInput).subscribe({
      // Success State
      next: () => {
        this.isLoading = false;
        this.router.navigate(['../', 'login'], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
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
