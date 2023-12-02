import { CanActivateFn } from '@angular/router';
import {Inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const isLogin = JSON.parse(localStorage.getItem('user') as string);

  return !!isLogin;
};
