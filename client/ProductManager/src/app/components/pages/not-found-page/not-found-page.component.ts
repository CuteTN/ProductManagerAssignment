import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {
  constructor(private router: Router) {}

  handleToHomeClick() {
    this.router.navigate(['']);
  }
}
