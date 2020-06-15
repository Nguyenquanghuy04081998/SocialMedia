import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private apiService: ApiService
  ) {}
  isActive;
  userActive: User;
  profile;
  allProfile;
  checked = false;
  ngOnInit(): void {
    this.userService.currentUser.subscribe(userData => {
      this.userActive = userData;
    });
    this.userService.isAuthenticated.subscribe(isActive => {
      this.isActive = isActive;
    });
    this.apiService.get('/users/all').subscribe(data => {
      this.allProfile = data.user;
    });
  }
  search(value) {
    this.checked = true;
    this.profile = this.allProfile.filter(
      e => e.username.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    if (value === '') {
      this.checked = false;
    }
  }
  viewProfile(name) {
    this.checked = false;
    this.router.navigateByUrl('/profile/' + name);
  }
}
