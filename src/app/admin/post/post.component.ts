import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DetaiPostComponent } from './detai-post/detai-post.component';
import { AdminCommentComponent } from './admin-comment/admin-comment.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts;
  select;
  checked= false;
  constructor(private apiService:ApiService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.reset();
  }
  getSelect(value){
    this.checked = true;
    if(value=='Checked'){
      this.resetChecked()
    }
    if(value=='Unchecked'){
      this.resetUnChecked()
    }
    if(value =='Choose...') {
      this.checked = false;
      this.reset();
    }
  }

  accrept(slug){
    const result = confirm('Are you sure to accrept?!');
    if (result === true) {
      this.apiService.post(`/articles/${slug}/checked`).subscribe(e=>{
        this.resetUnChecked();
        this.reset();
      })
    }
    return;
  }
  search(value){
    this.checked = true;
    this.select =this.posts.filter(e=>e.author.username.toLowerCase().indexOf(value.toLowerCase())!==-1);
    if(value==''){
      this.checked = false;
    }
  }
  prohibit(slug){
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.data = slug;
    dialogConfig.height = '50%';
    dialogConfig.width = '50%';
    
    const dialogRef = this.dialog.open(AdminCommentComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.resetChecked();
      this.reset();
    });
    
  }

  openDialog(post) {
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.data = post;
    if(post.video||post.image) dialogConfig.height = '800px';
    else dialogConfig.height = '400px';
    dialogConfig.width = '660px';
    
    const dialogRef = this.dialog.open(DetaiPostComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.reset();
    });

  }
  resetChecked(){
    this.apiService.get('/articles').subscribe(data=>{
      this.select = data.articles.filter(e=>e.checked == true);
    })
  }
  resetUnChecked(){
    this.apiService.get('/articles').subscribe(data=>{
      this.select = data.articles.filter(e=>e.checked == false);
    })
  }
  reset(){
    this.apiService.get('/articles').subscribe(data=>{
      this.posts = data.articles;
    })
  }

}
