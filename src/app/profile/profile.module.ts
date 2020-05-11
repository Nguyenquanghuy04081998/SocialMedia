import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritedComponent } from './favorited/favorited.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoreModule } from '../core/core.module';
import { ArticleModule } from '../article/article.module';
@NgModule({
  declarations: [FavoritedComponent, ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, CoreModule, ArticleModule],
  exports: [ProfileComponent, FavoritedComponent]
})
export class ProfileModule {}
