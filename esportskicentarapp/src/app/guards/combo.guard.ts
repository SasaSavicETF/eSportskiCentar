import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';

export const comboGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);
  const router = inject(Router);

  if (userService.activeUser != null && userService.checkExpiry() && (userService.activeUser.role === 'user' 
                  || userService.activeUser.role === 'upravnik' || userService.activeUser.role === 'admin'))
      return true;
  else{
    userService.logout();
    router.navigate(['/index']);
    return false;
  }
};
