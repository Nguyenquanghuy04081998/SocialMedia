import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ListArticleComponent } from './list-article/list-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { EditorComponent } from './editor/editor.component';
import { ArticleRoutingModule } from './article-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ListArticleComponent, DetailArticleComponent, EditorComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatProgressSpinnerModule
  ],
  exports: [ListArticleComponent]
})
export class ArticleModule {}
