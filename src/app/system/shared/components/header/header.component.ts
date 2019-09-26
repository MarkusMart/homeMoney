import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/modules/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  date = new Date();
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  user: User;
  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
