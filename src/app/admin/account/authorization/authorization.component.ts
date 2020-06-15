import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { ApiService } from 'src/app/core/services/api.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user;
  active;
  canPost;
  canComment;
  constructor(public userService: UserService, public dialog: MatDialog, private apiService: ApiService,
    private dialogRef: MatDialogRef<AuthorizationComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.user = data;
    this.active = data.active;
    this.canPost = data.canPost;
    this.canComment = data.canComment;
    }

  ngOnInit(): void {
  }

  UnlockAccount(id){
    this.apiService.post(`/users/${id}/unlock`).subscribe(e=>{
      this.active = !this.active
    });
  }

  lockAccount(id){
    this.apiService.post(`/users/${id}/lock`).subscribe(e=>{
      this.active = !this.active
    });
  }

  UnlockComment(id){
    this.apiService.post(`/users/${id}/UnlockComment`).subscribe(e=>{
      this.canComment = !this.canComment
    });
  }

  lockComment(id){
    this.apiService.post(`/users/${id}/lockComment`).subscribe(e=>{
      this.canComment = !this.canComment
    });
  }
  UnlockPost(id){
    this.apiService.post(`/users/${id}/unlockPost`).subscribe(e=>{
      this.canPost = !this.canPost
    });
  }

  lockPost(id){
    this.apiService.post(`/users/${id}/lockPost`).subscribe(e=>{
      this.canPost = !this.canPost
    });
  }
}
