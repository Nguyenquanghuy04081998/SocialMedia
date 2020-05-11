import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Profile } from 'src/app/core/models';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ApiService } from 'src/app/core/services/api.service';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Profile;
  userName: string;
  checkTypeProfile: boolean;
  subscribeUserName: Subscription;
  subcribeCurrenUser: Subscription;
  subscribeProfile: Subscription;
  subcribeFollow: Subscription;
  subcribeUnFollow: Subscription;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeUserName = this.route.params.subscribe(name => {
      this.userName = name.username;
      this.resetProfile();
    });

    this.setUserName(this.userName);
    this.subcribeCurrenUser = this.getCurrentUser().subscribe(userCurrent => {
      if (this.userName === userCurrent.user.username) {
        this.checkTypeProfile = true;
      } else {
        this.checkTypeProfile = false;
      }
    });
  }

  follow() {
    this.subcribeFollow = this.profileService
      .follow(this.userName)
      .subscribe(() => {
        this.resetProfile();
      });
  }

  unFollow() {
    this.subcribeUnFollow = this.profileService
      .unfollow(this.userName)
      .subscribe(() => {
        this.resetProfile();
      });
  }

  resetProfile() {
    this.subscribeProfile = this.profileService
      .getProfile(this.userName)
      .subscribe(
        profile => {
          this.profile = profile.profile;
        },
        err => this.router.navigate(['notfound'])
      );
  }

  setUserName(namePath) {
    this.apiService.setUserName(namePath);
  }

  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  ngOnDestroy() {
    if (this.subcribeCurrenUser) {
      this.subcribeCurrenUser.unsubscribe();
    }
    if (this.subscribeUserName) {
      this.subscribeUserName.unsubscribe();
    }
    if (this.subcribeFollow) {
      this.subcribeFollow.unsubscribe();
    }
    if (this.subcribeUnFollow) {
      this.subcribeUnFollow.unsubscribe();
    }
    if (this.subscribeProfile) {
      this.subscribeProfile.unsubscribe();
    }
  }
}
