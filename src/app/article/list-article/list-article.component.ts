import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { Article } from "src/app/core/models";
import { Subscription } from "rxjs";
import { ArticlesService } from "src/app/core/services/articles.service";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-list-article",
  templateUrl: "./list-article.component.html",
  styleUrls: ["./list-article.component.css"]
})
export class ListArticleComponent implements OnInit, OnChanges, OnDestroy {
  @Input() nameTag;
  @Input() config;
  @Input() page;
  @Input() pageSize;
  articleList: Article[];
  namePath: string;
  checkProfile: boolean;
  articleListFilter: Article[];
  error: boolean;
  errorFeed: boolean;
  subscribe: Subscription;
  displayArticle: string;
  isAuthenticated: boolean;
  currentUser;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private articleService: ArticlesService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(user => {
      this.namePath = user.username;
      this.filerArticle();
    });
    if (this.namePath !== undefined) {
      this.checkProfile = true;
    } else {
      this.checkProfile = false;
    }
      this.filerArticle();
      this.getArticle();
    

    this.subscribe = this.userService.isAuthenticated.subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
      }
    );
    this.userService.getCurrentUser().subscribe(e => {
      this.currentUser = e.user;
    });
  }

  ngOnChanges() {
    this.getArticle();
  }

  navigate(url) {
    this.router.navigate(["article", url]);
  }

  navigateProfile(url) {
    this.router.navigate(["profile", url]);
  }

  filerArticle() {
    this.subscribe = this.apiService
      .get("/articles", this.namePath, "20")
      .subscribe(listArticle => {
        this.articleListFilter = listArticle.articles.filter(
          e => e.checked == true
        );
        if (this.articleListFilter) {
          this.error = false;
        }
        if (
          this.articleListFilter.length === 0 ||
          this.articleListFilter === undefined
        ) {
          this.error = true;
        }
      });
  }

  getArticle() {
    this.displayArticle = this.config === "all" ? "" : "feed";

    this.subscribe = this.apiService
      .get(
        `/articles/${this.displayArticle}`,
        undefined,
        this.pageSize,
        this.page,
        undefined,
        this.nameTag
      )
      .subscribe(listArticle => {
        if (listArticle) {
          this.articleList = listArticle.articles.filter(
            e => e.checked == true
          );
          this.errorFeed = false;
        }
        // if (listArticle.articles.length === 0 || listArticle.articles === undefined) {
        if (
          listArticle.articles === undefined ||
          listArticle.articles.length == 0
        ) {
          this.errorFeed = true;
        }
      });
  }

  rate(rate, slug) {
    this.subscribe = this.apiService
    .post(`/articles/${slug}/${rate}/favorite`)
    .subscribe(data => {
        this.filerArticle();
        this.getArticle();
    });
    if (!this.isAuthenticated) {
      this.router.navigateByUrl("/auth/login");
      return;
    }
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
