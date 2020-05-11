import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanActiveGuard implements CanActivate, OnDestroy {
  isActive: boolean;
  subcribe: Subscription;
  constructor(private userService: UserService) {
    this.subcribe = this.userService.isAuthenticated.subscribe(at => {
      this.isActive = !at;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isActive;
  }

  ngOnDestroy() {
    this.subcribe.unsubscribe();
  }
}
