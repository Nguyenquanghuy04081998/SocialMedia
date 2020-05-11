import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from './pagination/pagination.component';
import { TagComponent } from './tag/tag.component';
import { HomeRoutingModule } from './home-routing.module';
import { ArticleModule } from '../article/article.module';
import { CoreModule } from '../core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [HomeComponent, PaginationComponent, TagComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ArticleModule,
    CoreModule,
    MatPaginatorModule
  ],
  exports: [HomeComponent, PaginationComponent, TagComponent]
})
export class HomeModule {}
