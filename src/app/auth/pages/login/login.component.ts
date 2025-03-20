import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/Models/User/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // This is the user data for the component
  userInput = { email: '', password: '' };

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
    this.authService.loginUser(this.userInput).subscribe({
      // Success State
      next: (user: User) => {
        this.isLoading = false;
        const role = user.role.toLowerCase();

        // Redirecting to the user's role dashboard
        this.router.navigate(['../../', role], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterPage() {
    this.router.navigate(['../', 'register'], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the cancel button in the error card
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
