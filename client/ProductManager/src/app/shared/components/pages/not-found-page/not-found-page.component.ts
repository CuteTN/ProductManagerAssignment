import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {
  constructor(
    private toastr: ToastrService
  ) {}

  handleSnakeEat(score: number) {
    this.toastr.info(
      this.getRandomCongratMessage(),
      `Score: ${score}`
    );
  }

  handleSnakeDie(score: number) {
    this.toastr.error(
      `Your score is ${score}.`,
      'Game over!',
    );
  }

  private getRandomCongratMessage() {
    const index = Math.floor(Math.random() * CONGRAT_MESSAGES.length);
    return CONGRAT_MESSAGES[index];
  }
}

const CONGRAT_MESSAGES = [
  `Hạnh, Yến, Chương are so so cute!`,
  `Yummy!`,
  `Amazing, good job!`,
  `Can we make it to 81?`,
  `You've eaten too much`,
  `Spare me some goodies!`,
  `Smoothies!`,
  `This message is so random. Why you bother reading it anyway?`,
  `Chomp chomp chomp`,
  `Supercalifragilisticexpialidocious!`,
  `Hiss...`,
]