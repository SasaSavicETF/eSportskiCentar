import { CanActivateFn, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { inject } from '@angular/core';

export const dezurniGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);
  const router = inject(Router);

  if (userService.activeUser != null && userService.checkExpiry() && userService.activeUser.role === 'radnik')
      return true;
  else{
    userService.logout();
    router.navigate(['/index']);
    return false;
  }
};
