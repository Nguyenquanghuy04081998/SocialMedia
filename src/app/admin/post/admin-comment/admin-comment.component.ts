import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.css']
})
export class AdminCommentComponent implements OnInit {
  slug;
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AdminCommentComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.slug = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
  submit(comment) {
    const result = confirm('Are you sure to prohibit?!');
    if (result === true) {
      this.apiService.post(`/articles/${this.slug}/prohibit`).subscribe(e => {
        this.apiService
          .post(`/users/${this.slug}/adminComment`, { text: comment })
          .subscribe(article => {
            this.dialogRef.close();
          });
      });
    }
    return;
  }
}
