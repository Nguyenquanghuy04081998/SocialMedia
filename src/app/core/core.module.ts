import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { ApiService } from './services/api.service';
import { ArticlesService } from './services/articles.service';
import { CommentsService } from './services/comments.service';
import { JwtService } from './services/jwt.service';
import { TagsService } from './services/tags.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    ArticlesService,
    CommentsService,
    JwtService,
    TagsService,
    UserService
  ]
})
export class CoreModule {}
