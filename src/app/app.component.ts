import { Component, OnInit } from '@angular/core';
import { UserService } from './core/services/user.service';
import { JwtService } from './core/services/jwt.service';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mockproject-blog';
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}
  ngOnInit(): void {
    
    if (this.jwtService.getToken()) {
      this.apiService.get('/users').subscribe(
        
        data => {
          this.userService.setUser(data.user)
          },
        err => this.userService.logOutUser()
        
      );
    } else {
      this.userService.logOutUser();
    }
  }
}
