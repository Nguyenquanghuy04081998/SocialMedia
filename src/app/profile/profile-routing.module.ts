import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListArticleComponent } from '../article/list-article/list-article.component';
import { FavoritedComponent } from './favorited/favorited.component';

const routes: Routes = [
  {
    path: ':username', // chua named
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ListArticleComponent
      },
      {
        path: 'favorites',
        component: FavoritedComponent
      }
    ]
  }
  // {path: "", redirectTo: "username", pathMatch: 'full'}
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
