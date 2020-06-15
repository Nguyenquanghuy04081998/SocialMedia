import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../core/layout/notfound.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { PostComponent } from './post/post.component';
import { AppreciatedComponent } from './post/appreciated/appreciated.component';
import { AverageComponent } from './post/average/average.component';
import { PoorlyComponent } from './post/poorly/poorly.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: AdminComponent, children:[
    {path:'home', component:HomeComponent},
    {path:'accounts',component:AccountComponent},
    {path:'posts',component:PostComponent},
    {path:'appreciated', component: AppreciatedComponent},
    {path:'average', component: AverageComponent},
    {path:'poorly', component: PoorlyComponent}
  ]},
  { path: '**', component: NotfoundComponent }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
