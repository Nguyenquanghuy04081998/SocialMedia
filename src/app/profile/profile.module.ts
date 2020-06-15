import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritedComponent } from './favorited/favorited.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoreModule } from '../core/core.module';
import { ArticleModule } from '../article/article.module';
import { BandArticleComponent } from './band-article/band-article.component';
import {MatButtonModule} from '@angular/material/button';
import { DetailBandComponent } from './detail-band/detail-band.component';
import { EditAvatarComponent } from './profile/edit-avatar/edit-avatar.component';
@NgModule({
  declarations: [FavoritedComponent, ProfileComponent, BandArticleComponent, DetailBandComponent, EditAvatarComponent],
  imports: [CommonModule, ProfileRoutingModule, CoreModule, ArticleModule,MatButtonModule],
  exports: [ProfileComponent, FavoritedComponent]
})
export class ProfileModule {}
