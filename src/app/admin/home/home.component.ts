import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalUser:number;
  totalPost:number;
  totalPostPending:number;
  totalTag:number;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.get('/users/all').subscribe(dataUser=>{
      this.totalUser = dataUser.user.length;
    });
    this.apiService.get('/articles').subscribe(dataPost=>{
      this.totalPost = dataPost.articles.length;
    });
    this.apiService.get('/articles').subscribe(dataPost=>{
      this.totalPostPending = dataPost.articles.filter(e=>e.checked==false).length;
    });
    this.apiService.get('/tags').subscribe(dataTag=>{
      this.totalTag = dataTag.tags.length;
    });
  }

}
