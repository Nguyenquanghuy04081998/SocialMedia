import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingComponent } from '../setting/setting.component';

@Injectable({
  providedIn: 'root'
})
export class SettingDeactiveGuard implements CanDeactivate<SettingComponent> {
  canDeactivate(
    component: SettingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.checkCandiactive === undefined) {
      const result = confirm('Are you sure to quit?!');
      if (result === true) {
        return true;
      }
      return false;
    }
    if (component.checkCandiactive) {
      return true;
    }
  }
}
