import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KlijentService } from '../services/klijent.service';

export const comboGuard: CanActivateFn = (route, state) => {
  const userService = inject(KlijentService);

  if (userService.activeUser != null && (userService.activeUser.role === 'user' 
                  || userService.activeUser.role === 'upravnik' || userService.activeUser.role === 'admin'))
      return true;
  else{
    userService.logout();
    return false;
}
};
