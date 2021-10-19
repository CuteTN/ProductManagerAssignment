import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthManagerService } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authManagerService: AuthManagerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const username = this.authManagerService.loggedInUsername();

    if (username) return true;

    const url = route.url.map((segment) => segment.path).join('/');

    this.toastr.info('You have to log in first!', 'Unauthenticated');
    this.router.navigate(['login'], {
      queryParams: { url },
    });

    return false;
  }
}
