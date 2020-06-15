import { Component, OnInit } from '@angular/core';
import { Profile, Article, ArticleListConfig } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { ArticlesService } from 'src/app/core/services/articles.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DetailBandComponent } from '../detail-band/detail-band.component';

@Component({
  selector: 'app-band-article',
  templateUrl: './band-article.component.html',
  styleUrls: ['./band-article.component.css']
})
export class BandArticleComponent implements OnInit {
  check = false;
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
    public dialog: MatDialog,
    private apiService: ApiService,
    private articleService: ArticlesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }
  getArticle() {
    this.userService.getCurrentUser().subscribe(e=>{
      if(e.user.username == this.apiService.namePath){
        this.check = true;
        this.apiService.get('/articles',this.apiService.namePath).subscribe(data => {
          this.listFavorite = data.articles.filter(e=>e.checked==false);
          if (this.listFavorite) {
            this.error = false;
          }
          if (this.listFavorite.length === 0 || this.listFavorite === undefined) {
            this.error = true;
          }
      }); 
      }
      else {
        this.check = false;
      }
    })
    
  }
  navigate(username) {
    this.router.navigate(['profile', username]);
  }
  navigateDetail(url) {
    this.router.navigate(['article', url]);
  }

  openDialog(post){
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.data = post;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    
    const dialogRef = this.dialog.open(DetailBandComponent,dialogConfig);

   
    
  }

}
