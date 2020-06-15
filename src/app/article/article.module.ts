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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InstroctionUpVideoComponent } from './instroction-up-video/instroction-up-video.component';
@NgModule({
  declarations: [
    ListArticleComponent,
    DetailArticleComponent,
    EditorComponent,
    InstroctionUpVideoComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ListArticleComponent]
})
export class ArticleModule {}
