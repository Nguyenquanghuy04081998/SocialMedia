import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { ForgotComponent } from './forgot/forgot.component';
@NgModule({
  declarations: [SettingComponent, AuthComponent, ForgotComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,MatButtonModule],
  exports: [SettingComponent]
})
export class AuthModule {}
