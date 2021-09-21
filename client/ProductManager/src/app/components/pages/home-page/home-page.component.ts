import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleToProductsClick() {
    this.router.navigate(['products']);
  }

  handleAddProductClick() {
    this.router.navigate(['product/editor']);
  }
}
