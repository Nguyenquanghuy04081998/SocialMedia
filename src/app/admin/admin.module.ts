import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './account/detail/detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AuthorizationComponent } from './account/authorization/authorization.component';
import { DetaiPostComponent } from './post/detai-post/detai-post.component';
import { MatChipsModule } from '@angular/material/chips';
import { AppreciatedComponent } from './post/appreciated/appreciated.component';
import { AverageComponent } from './post/average/average.component';
import { PoorlyComponent } from './post/poorly/poorly.component';
import { AdminCommentComponent } from './post/admin-comment/admin-comment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ForgotComponent } from './account/forgot/forgot.component';

@NgModule({
  declarations: [
    AdminComponent,
    AccountComponent,
    PostComponent,
    HomeComponent,
    DetailComponent,
    AuthorizationComponent,
    DetaiPostComponent,
    AppreciatedComponent,
    AverageComponent,
    PoorlyComponent,
    AdminCommentComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule
  ]
})
export class AdminModule {}
