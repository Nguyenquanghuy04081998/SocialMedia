import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';
import { ApiService } from 'src/app/core/services/api.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { log } from 'util';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, OnDestroy {
  errors;
  userCurrent: User;
  checkCandiactive: boolean;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    image: new FormControl(),
    bio: new FormControl(),
    username: new FormControl()
  });
  subscribe: Subscription;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.userCurrent = user.user;
    });
  }

  submit() {
    if (this.form.value.username == null) {
      this.form.value.username = this.userCurrent.username;
    }
    if (this.form.value.image == null) {
      this.form.value.image = this.userCurrent.image;
    }
    if (this.form.value.email === '') {
      this.form.value.email = this.userCurrent.email;
    }
    if (this.form.value.password === '') {
      this.form.value.password = this.jwtService.getPassword();
    }
    this.subscribe = this.apiService
      .put(`/user`, { user: this.form.value })
      .subscribe(
        data => {
          console.log(data.user);
          
          this.router.navigate(['/profile', this.form.value.username]);
          this.userService.currentUserSubject.next(data.user);
        },
        err => {
          this.errors = err?.error?.errors;
          console.log(this.errors);
        }
      );
    return (this.checkCandiactive = true);
  }

  logOut() {
    this.userService.logOutUser();
    this.router.navigateByUrl('/');
  }

  deleteAccount() {
    console.log(this.userCurrent.token);

    this.apiService
      .delete('/profiles/' + this.userCurrent.username)
      .subscribe(e => {
        this.userService.logOutUser();
        this.router.navigateByUrl('/');
      });
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
