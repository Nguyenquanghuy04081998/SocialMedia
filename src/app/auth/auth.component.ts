import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ForgotComponent } from './forgot/forgot.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  formType = '';
  title = '';
  errors;
  errorEmailOrPassword: string[];
  isSubmitting = false;
  authForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    username: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    this.route.url.subscribe(data => {
      // UrlSegment
      this.formType = data[0].path;
      this.title = this.formType === 'login' ? 'Sign in' : 'Sign up';
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '250px';
    const dialogRef = this.dialog.open(ForgotComponent, dialogConfig);
  }
  submit() {
    this.userService.resovleAuth(this.formType, this.form.value).subscribe(
      () => this.router.navigateByUrl('/'),
      err => {
        this.errors = err.error;
      }
    );
  }
}
