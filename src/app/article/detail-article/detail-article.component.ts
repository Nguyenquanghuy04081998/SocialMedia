import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { Subscription } from 'rxjs';
import { Article, Profile } from 'src/app/core/models';
import { CommentsService } from 'src/app/core/services/comments.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ApiService } from 'src/app/core/services/api.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit, OnDestroy {
  articleDetail: Article;
  slug: Article;
  subscribe: Subscription;
  comments: Comment[];
  checkUser: boolean;
  profile: Profile;
  isAuthenticated: boolean;
  userCurrent;
  commentVal;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private commentService: CommentsService,
    private userService: UserService,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    if (this.jwtService.getToken()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    this.subscribe = this.route.params.subscribe(event => {
      this.slug = event.slug;
    });
    this.getArticleDetail();
    this.resetComment();
  }

  getArticleDetail() {
    this.subscribe = this.apiService
      .get(`/articles/${this.slug}`)
      .subscribe((data: any) => {
        this.articleDetail = data.article;
        if (this.isAuthenticated) {
          this.userService.getCurrentUser().subscribe(curUser => {
            this.userCurrent = curUser.user;

            if (this.articleDetail?.author.username === curUser.user.username) {
              this.checkUser = true;
            } else {
              this.checkUser = false;
            }
          });
        }

        this.articleDetail = data.article;
      });
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  postComment(newComment) {
    this.commentVal = newComment;
    this.commentService
      .postComment(this.slug, { comment: { body: newComment } })
      .subscribe(newDataComment => {
        this.comments.unshift(newDataComment);
        this.resetComment();
        this.commentVal = '';
      });
  }

  resetComment() {
    this.subscribe = this.commentService
      .getComment(this.slug)
      .subscribe((data: any) => {
        this.comments = data.comments;
      });
  }

  deleteComment(id) {
    this.subscribe = this.commentService
      .deleteComment(id, this.slug)
      .subscribe((data: any) => {
        this.resetComment();
      });
  }

  follow() {
    this.profileService
      .follow(this.articleDetail?.author.username)
      .subscribe(data => {
        this.resetProfile();
      });
  }

  unFollow() {
    this.profileService
      .unfollow(this.articleDetail?.author.username)
      .subscribe(data => {
        this.resetProfile();
      });
  }

  resetProfile() {
    this.profileService
      .getProfile(this.articleDetail?.author.username)
      .subscribe(profile => {
        this.articleDetail.author = profile.profile;
      });
  }

  deleteArticle() {
    const result = confirm('Are you sure to delete?!');
    if (result === true) {
      this.articleService.deleteArticle(this.slug).subscribe(data => {
        this.router.navigateByUrl(
          '/profile/' + this.articleDetail?.author.username
        );
      });
    }
    return;
  }

  toggleFavorite(slug, favorited) {
    if (favorited === false) {
      this.subscribe = this.articleService
        .favorite(slug)
        .subscribe((data: any) => {
          data.article.favoritesCount++;
          this.getArticleDetail();
        });
    } else {
      this.subscribe = this.articleService
        .unfavorite(slug)
        .subscribe((data: any) => {
          data.article.favoritesCount--;
          this.getArticleDetail();
        });
    }
  }
  navigate(username) {
    this.router.navigate(['profile', username]);
  }
}
