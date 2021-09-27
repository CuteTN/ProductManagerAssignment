import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyDialogComponent, MyDialogData } from '../..';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  handleToProductsClick() {
    this.router.navigate(['products']);
  }

  handleAddProductClick() {
    this.router.navigate(['product/editor']);
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
