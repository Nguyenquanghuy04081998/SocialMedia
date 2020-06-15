import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { Observable } from 'rxjs';
import { ForgotComponent } from './forgot/forgot.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  users;
  select;
  checked = false;
  // length;
  // userForgot;
  displayedColumns = ['username'];
  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.reset();
    // this.apiService.get('/users/all').subscribe(e => {
    //   this.userForgot = e.user.filter(user => e.forgot == true);
    //   this.length = this.userForgot.length;
    // });
  }

  getSelect(value) {
    this.checked = true;
    if (value === 'active') {
      this.select = this.users.filter(user => user.active === false);
    }
    if (value === 'posting') {
      this.select = this.users.filter(user => user.canPost === false);
    }
    if (value === 'comment') {
      this.select = this.users.filter(user => user.canComment === false);
    }
    if (value === 'Choose...') {
      this.checked = false;
      this.reset();
    }
  }

  openDialog(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    dialogConfig.width = '660px';
    dialogConfig.height = '800px';
    const dialogRef = this.dialog.open(DetailComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.reset();
    });
  }
  // openDialogForgot(user){
  //   const dialogConfig  = new MatDialogConfig();
  //   dialogConfig.data = user;
  //   dialogConfig.width = '90%';
  //   dialogConfig.height = '90%';
  //   const dialogRef = this.dialog.open(ForgotComponent,dialogConfig);
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.reset();
  //   });
  // }

  reset() {
    this.apiService.get('/users/all').subscribe(data => {
      this.users = data.user;
    });
  }
  search(value) {
    this.checked = true;
    this.select = this.users.filter(
      e => e.email.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    if (value === '') {
      this.checked = false;
    }
  }
}
