import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { EditCanActiveGuard } from '../auth/guards/edit-can-active.guard';
import { EditorDeactiveGuard } from '../auth/guards/editor-deactive.guard';

const routes: Routes = [
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [EditCanActiveGuard],
    canDeactivate: [EditorDeactiveGuard]
  },
  { path: ':slug', component: DetailArticleComponent },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [EditCanActiveGuard],
    canDeactivate: [EditorDeactiveGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
