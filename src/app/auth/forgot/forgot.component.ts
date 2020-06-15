import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  error;
  constructor( private apiService: ApiService, public dialogRef: MatDialogRef<ForgotComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
    }
  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }

  submit(email){
    this.apiService.post('/users/forgot/resetPassAndSendEmail',{email:email}).subscribe(e=>{
      alert('The administrator will send the password to your email, please check your email');
      this.dialogRef.close(); 
    },
    err => this.error = err.error.error
    )}
}
