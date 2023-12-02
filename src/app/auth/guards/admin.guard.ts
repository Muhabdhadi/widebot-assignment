import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../../login/login.service";
import {map} from "rxjs";
import {RolesEnum} from "../../login/enums/roles.enum";

export const adminGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.getUser.pipe(
      map(user => {
        if (!user) {
          router.navigate(['./login']);
          return false;
        }

        if(user?.role === RolesEnum.ADMIN) {
          return true
        }

        router.navigate(['./user'])
        return false
      })
  );
};
