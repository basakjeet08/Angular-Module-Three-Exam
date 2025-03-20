import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from 'src/app/shared/Models/User/Role';
import { ProfileService } from 'src/app/shared/services/profile.service';

export const adminGuard: CanActivateFn = (_route, _state) => {
  // Injecting the necessary dependencies
  const profileService = inject(ProfileService);
  const router = inject(Router);

  if (profileService.getUser()?.role === Role.ADMIN) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
