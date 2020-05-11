import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { EditorComponent } from 'src/app/article/editor/editor.component';

@Injectable({
  providedIn: 'root'
})
export class EditorDeactiveGuard implements CanDeactivate<EditorComponent> {
  canDeactivate(
    component: EditorComponent,
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
