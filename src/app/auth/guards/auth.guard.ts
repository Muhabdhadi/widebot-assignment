import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const isLogin = JSON.parse(localStorage.getItem('user') as string);

  return !!isLogin;
};
