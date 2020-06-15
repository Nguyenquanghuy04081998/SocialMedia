import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SettingComponent } from './setting/setting.component';
import { AuthComponent } from './auth.component';
import { NotfoundComponent } from '../core/layout/notfound.component';
import { CanActiveGuard } from './guards/can-active.guard';
import { EditCanActiveGuard } from './guards/edit-can-active.guard';
import { SettingDeactiveGuard } from './guards/setting-deactive.guard';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [CanActiveGuard] },
  { path: 'register', component: AuthComponent, canActivate: [CanActiveGuard] },
  {
    path: 'settings',
    component: SettingComponent,
    canActivate: [EditCanActiveGuard],
    canDeactivate: [SettingDeactiveGuard]
  },
  {path: 'forgot', component: ForgotComponent}
  ,
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
