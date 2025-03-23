import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
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

  // These are the event emitters which will notify the parent about the api state
  @Output('onSuccess') successEmitter = new EventEmitter<void>();

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loaderService: LoaderService
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

        // Showing a success toast
        this.toastService.showToast({
          type: 'success',
          message: 'User registered successfully !!',
        });

        this.successEmitter.emit();
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
