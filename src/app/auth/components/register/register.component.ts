import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scaleUpAnimation } from 'src/app/shared/animations/scale-up-animation';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [scaleUpAnimation],
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

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the submit button
  onRegisterClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.authService.registerUser(this.userInput).subscribe({
      // Success State
      next: () => {
        this.loaderService.endLoading();
        this.router.navigate(['../', 'login'], { relativeTo: this.route });
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }

  // This function is invoked when the user clicks on the go to login page button
  OnGoToLogin() {
    this.router.navigate(['../', 'login'], { relativeTo: this.route });
  }
}
