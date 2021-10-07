import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthManagerService, LocalstorageTokensProviderService } from 'src/app/core/services';
import { MyDialogComponent, MyDialogData } from '../..';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  
  constructor(
    private router: Router,
    private tokenProvider: LocalstorageTokensProviderService,
    private jwtHelper: JwtHelperService,
    private authManager: AuthManagerService,
    public dialog: MatDialog
  ) {}

  get username() {
    const token = this.tokenProvider.accessToken;
    return this.jwtHelper.decodeToken(token ?? undefined)?.username;
  }
    
  ngOnInit(): void {}

  handleToProductsClick() {
    this.router.navigate(['products']);
  }

  handleAddProductClick() {
    this.router.navigate(['product/editor']);
  }

  handleLoginClick() {
    this.router.navigate(['login']);
  }

  handleLogoutClick() {
    const sub = this.authManager.logout().subscribe(() => {
      sub.unsubscribe();
    });
  }

  handleTestNotiClick() {
    const myDialogData: MyDialogData = {
      title: 'Just a test',
      text: 'Yey man',
      duration: 3000,
      loading: true,
      buttons: [
      ],
    };

    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: myDialogData,
    });
  }
}
