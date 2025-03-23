import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAnimation } from 'src/app/shared/animations/scale-up-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { User } from 'src/app/shared/Models/User/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [scaleUpAnimation],
})
export class LoginComponent {
  // This is the user data for the component
  userInput = { email: '', password: '' };

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the submit button
  onSubmitClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.authService.loginUser(this.userInput).subscribe({
      // Success State
      next: (user: User) => {
        this.loaderService.endLoading();
        const role = user.role.toLowerCase();

        // Redirecting to the user's role dashboard
        this.router.navigate(['../../', role], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the go to register page button
  onGoToRegisterPage() {
    this.router.navigate(['../', 'register'], { relativeTo: this.route });
  }
}
