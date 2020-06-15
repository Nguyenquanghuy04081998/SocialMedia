import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userAdmin;
  // length;
  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(e => {
      this.userAdmin = e.user;
    });
    // this.apiService.get('/users/all').subscribe(e=>{this.length=e.user.filter(e=>e.forgot==true).length;
    // })
  }

  logOut() {
    const result = confirm('Are you sure to prohibit?!');
    if (result === true) {
      this.userService.logOutUser();
      this.router.navigateByUrl('/auth/login');
    }
  }
}
