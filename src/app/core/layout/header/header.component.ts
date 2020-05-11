import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}
  isActive;
  userActive: User;

  ngOnInit(): void {
    this.userService.currentUser.subscribe(userData => {
      this.userActive = userData;
    });
    this.userService.isAuthenticated.subscribe(isActive => {
      this.isActive = isActive;
    });
  }
}
