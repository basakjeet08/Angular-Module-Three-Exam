import { Component, EventEmitter, Output } from '@angular/core';
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
        const role = user.role.toLowerCase();

        this.toastService.showToast({
          type: 'success',
          message: 'User logged in successfully !!',
        });

        this.successEmitter.emit(role);
      },

      // Error State
      error: (error: Error) => {
        this.loaderService.endLoading();
        this.toastService.showToast({ type: 'error', message: error.message });
      },
    });
  }
}
