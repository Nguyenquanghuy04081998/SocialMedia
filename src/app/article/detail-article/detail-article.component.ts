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
import { log } from 'util';
import { DomSanitizer } from '@angular/platform-browser';

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
  error;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private commentService: CommentsService,
    private userService: UserService,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private apiService: ApiService,
    public sanitizer: DomSanitizer
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

  getVideo(){
    return 'https://www.youtube.com/embed/'+this.articleDetail.video;
  }

  getArticleDetail() {
    this.subscribe = this.apiService
      .get(`/articles/${this.slug}`)
      .subscribe((data: any) => {
        this.articleDetail = data.articles;
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
        this.articleDetail = data.articles;

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
      },
      err=>{
        this.error = err.error.error;
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

  navigate(username) {
    this.router.navigate(['profile', username]);
  }
   rate(rate, slug){
    
    this.subscribe = this.apiService.post(`/articles/${slug}/${rate}/favorite`).subscribe( data => {
       this.getArticleDetail();
       this.resetComment();
    });
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/auth/login');
      return;
    }
    
  }
}
