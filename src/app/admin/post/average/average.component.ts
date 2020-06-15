import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetaiPostComponent } from '../detai-post/detai-post.component';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit {
  posts;
  select;
  checked = false;
  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.reset();
  }

  prohibit(slug) {
    const result = confirm('Are you sure to prohibit?!');
    if (result === true) {
      this.apiService.post(`/articles/${slug}/prohibit`).subscribe(e => {
        this.reset();
      });
    }
    return;
  }

  openDialog(post) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = post;
    if (post.video || post.image) dialogConfig.height = '800px';
    else dialogConfig.height = '400px';
    dialogConfig.width = '660px';

    const dialogRef = this.dialog.open(DetaiPostComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.reset();
    });
  }
  search(value) {
    this.checked = true;
    this.select = this.posts.filter(
      e => e.author.username.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    if (value == '') {
      this.checked = false;
    }
  }

  reset() {
    this.apiService.get('/articles').subscribe(data => {
      this.posts = data.articles.filter(
        e => e.favoritesCount >= 2 && e.favoritesCount < 4 && e.checked == true
      );
    });
  }
}
