import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialog
} from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  checked = false;
  select;
  users;
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ForgotComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.users = data;
    console.log(this.users);
  }

  ngOnInit(): void {}
  search(value) {
    this.checked = true;
    this.select = this.users.filter(
      e => e.email.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    if (value == '') {
      this.checked = false;
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
  reset() {
    this.apiService.get('/users/all').subscribe(data => {
      this.users = data.user.filter(e => e.forgot == true);
    });
  }
  resetPassword(user) {
    const result = confirm('Are you sure to reset Password to 12345678?!');
    if (result === true) {
      this.apiService
        .post('/users/forgot/resetPassAndSendEmail', { email: user.email })
        .subscribe(e => {
          this.reset();
        });
    }
    return;
  }
}
