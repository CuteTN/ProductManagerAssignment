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
  ) {}
    
  ngOnInit(): void {}
}
