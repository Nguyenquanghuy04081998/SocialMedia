import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageIndex: number;
  nameTag: string;
  config = 'feed';
  isAuthenticated: boolean;
  describe = '';
  subscribe: Subscription;
  pageSize: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.subscribe = this.userService.isAuthenticated.subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
        this.setConfig('all');
      }
    );
  }

  getNameTag(event) {
    this.nameTag = event;
    if (this.nameTag !== undefined || this.nameTag !== '') {
      this.describe = 'filter by: ';
    }
    if (this.nameTag === '') {
      this.describe = '';
    }
  }

  setConfig(nameConfig) {
    this.config = nameConfig;
    if (nameConfig === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/auth/login');
      return;
    }
  }

  getPage(event) {
    this.pageIndex = event;
  }

  getPageSize(event) {
    this.pageSize = event;
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
