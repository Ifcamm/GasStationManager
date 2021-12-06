import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  private authListenerSub!: Subscription;
  username = '';
  userId = '';

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.isLogin = this.userService.getIsAuthenticated();
    this.userId = this.userService.getUserId();
    console.log('aquipasa');
    console.log(this.userId);
    console.log('aquitermina');

    this.userService.getUser(this.userId).subscribe((user) => {
      this.username = user.name;
    });

    this.authListenerSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLogin = authStatus;
        this.userId = this.userService.getUserId();

        this.userService.getUser(this.userId).subscribe((user) => {
          this.username = user.name;
          console.log('aquipasa2');
          console.log(user);
          console.log('aquitermina2');
        });
      });
  }
  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
