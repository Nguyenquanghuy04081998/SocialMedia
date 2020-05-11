import { Component, OnInit } from '@angular/core';
import { Profile, ArticleListConfig, Article } from 'src/app/core/models';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-favorited',
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css']
})
export class FavoritedComponent implements OnInit {
  profile: Profile;
  listFavorite: Article[];
  subscribe: Subscription;
  error: boolean;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }
  getArticle() {
    this.apiService
      .get(
        '/articles',
        undefined,
        undefined,
        undefined,
        this.apiService.namePath
      )
      .subscribe(data => {
        this.listFavorite = data.articles;
        console.log(this.listFavorite);

        if (this.listFavorite) {
          this.error = false;
        }
        if (this.listFavorite.length === 0 || this.listFavorite === undefined) {
          this.error = true;
        }
      });
  }
  toggleFavorite(slug, favorited) {
    if (favorited === false) {
      this.subscribe = this.articleService
        .favorite(slug)
        .subscribe((data: any) => {
          data.article.favoritesCount++;
          this.getArticle();
        });
    } else {
      this.subscribe = this.articleService
        .unfavorite(slug)
        .subscribe((data: any) => {
          data.article.favoritesCount--;
          this.getArticle();
        });
    }
  }
  navigate(username) {
    this.router.navigate(['profile', username]);
  }
  navigateDetail(url) {
    this.router.navigate(['article', url]);
  }
}
