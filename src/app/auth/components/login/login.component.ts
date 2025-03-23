import { Component, EventEmitter, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { User } from 'src/app/shared/Models/User/User';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // These are the details inputted by the user
  userInput = { email: '', password: '' };

  // These are the event emitters which will notify the parent about the api state
  @Output('onSuccess') successEmitter = new EventEmitter<string>();

  // Injecting the required dependencies
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loaderService: LoaderService
  ) {}

  // This function is invoked when the user clicks on the submit button
  onLoginClick() {
    // Setting the loading state
    this.loaderService.startLoading();

    // Calling the api
    this.authService.loginUser(this.userInput).subscribe({
      // Success State
      next: (user: User) => {
        this.loaderService.endLoading();

        // Showing the success toast
        this.toastService.showToast({
          type: 'success',
          message: 'User logged in successfully !!',
        });

        // Passing the sucess event to the parent component
        this.successEmitter.emit(user.role.toLowerCase());
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
