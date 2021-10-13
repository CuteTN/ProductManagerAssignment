import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css'],
})
export class SnakeGameComponent implements OnInit, OnDestroy {
  readonly GAME_COLUMNS = 9;
  readonly INITIAL_SNAKE_BODY: Point[] = [
    {
      x: Math.floor(this.GAME_COLUMNS / 2) - 1,
      y: Math.floor(this.GAME_COLUMNS / 2),
    },
    {
      x: Math.floor(this.GAME_COLUMNS / 2),
      y: Math.floor(this.GAME_COLUMNS / 2),
    },
    {
      x: Math.floor(this.GAME_COLUMNS / 2) + 1,
      y: Math.floor(this.GAME_COLUMNS / 2),
    },
  ];
  readonly MS_PER_FRAME = 150;
  readonly FOOD_ICONS =
    '🍏,🍎,🍐,🍊,🍋,🍌,🍉,🍇,🍓,🍈,🍒,🍑,🥭,🍍,🥥,🥝,🍅,🍆,🥑,🥦,🥬,🥒,🌽,🥕'.split(
      ','
    );

  @Output('on-snake-eat') onSnakeEat = new EventEmitter<number>();
  @Output('on-snake-die') onSnakeDie = new EventEmitter<number>();

  gameViewTiles: TileData[][] = [];
  isGameRunning = false;
  snake: SnakeModel;
  food?: Point;
  foodIcon?: string;

  private gameLoopInterval: any;

  constructor() {
    this.snake = new SnakeModel(
      this.INITIAL_SNAKE_BODY,
      this.GAME_COLUMNS - 1,
      this.GAME_COLUMNS - 1
    );

    this.resetGame();
    this.gameLoopInterval = setInterval(() => {
      if (this.isGameRunning) this.updateGameLoop();
    }, this.MS_PER_FRAME);
  }

  ngOnInit(): void {}

  private resetViewTiles() {
    this.gameViewTiles = [];

    for (let i = 0; i < this.GAME_COLUMNS; i++) {
      let row: TileData[] = [];
      for (let j = 0; j < this.GAME_COLUMNS; j++) {
        row.push({
          state: 'empty',
        });
      }

      this.gameViewTiles.push(row);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.gameLoopInterval);
  }

  private startGame() {
    this.generateFood();
    this.isGameRunning = true;
  }

  private resetGame() {
    this.isGameRunning = false;
    this.snake.reset(this.INITIAL_SNAKE_BODY);
    this.food = undefined;
    this.resetViewTiles();
    this.assignSnakeBodyToViewTiles();
  }

  private updateGameLoop() {
    const oldTail = this.snake.getTail();
    this.snake.next();
    const newHead = this.snake.getHead();

    this.gameViewTiles[oldTail.y][oldTail.x].state = 'empty';
    this.assignSnakeBodyToViewTiles();

    if (newHead.x === this.food?.x && newHead.y === this.food?.y) {
      this.handleSnakeEat();
    }

    if (this.snake.isDead()) {
      this.handleSnakeDie();
    }
  }

  private assignSnakeBodyToViewTiles() {
    this.snake.body.forEach((cell, i) => {
      this.gameViewTiles[cell.y][cell.x].state =
        (i - this.snake.body.length) % 2 === 0 ? 'snake0' : 'snake4';
    });
  }

  private handleSnakeEat() {
    this.snake.eat();
    this.generateFood();
    this.onSnakeEat?.emit?.(this.snake.totalLength());
  }

  private handleSnakeDie() {
    this.onSnakeDie?.emit?.(this.snake.totalLength());
    this.resetGame();
  }

  private generateFood() {
    const emptyCells: Point[] = [];

    this.gameViewTiles.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell.state === 'empty') emptyCells.push({ x, y });
      })
    );

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    this.food = emptyCells[randomIndex];

    const randomIndexIcon = Math.floor(Math.random() * this.FOOD_ICONS.length);
    this.foodIcon = this.FOOD_ICONS[randomIndexIcon];

    this.gameViewTiles[this.food.y][this.food.x].state = 'food';
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: any) {
    if (!this.isGameRunning) {
      this.startGame();
    }

    switch (event.key) {
      case 'ArrowUp':
        this.snake.direction = 'up';
        break;
      case 'ArrowDown':
        this.snake.direction = 'down';
        break;
      case 'ArrowLeft':
        this.snake.direction = 'left';
        break;
      case 'ArrowRight':
        this.snake.direction = 'right';
        break;
      default:
        break;
    }
  }
}

interface TileData {
  state: 'snake4' | 'snake0' | 'empty' | 'food';
}

interface Point {
  x: number;
  y: number;
}

type Directions = 'up' | 'down' | 'left' | 'right';

class SnakeModel {
  // last cell is the head
  private _body: Point[] = [];
  get body() {
    return this._body;
  }
  set body(body: Point[]) {
    this._body = [...body];
    this.foodBuffer = [];
  }

  private _lastStepDirection: Directions = 'right';
  private _direction: Directions = 'right';
  get direction() {
    return this._direction;
  }
  set direction(direction) {
    // NOTE: this is to prevent the snake from going to the opposite direction
    const updown = ['up', 'down'];
    if (+updown.includes(direction) ^ +updown.includes(this._lastStepDirection))
      this._direction = direction;
  }

  private foodBuffer: number[] = [];

  constructor(body: Point[], private maxX: number, private maxY: number) {
    if (body) this.body = body;
  }

  reset(body: Point[]) {
    this.body = body;
    this._direction = 'right';
    this._lastStepDirection = 'right';
  }

  eat() {
    this.foodBuffer.push(this.foodBuffer.length + this.body.length);
  }

  next() {
    this.foodBuffer = this.foodBuffer.map((n) => n - 1);

    if (this.foodBuffer.length && this.foodBuffer[0] === 0) {
      this.foodBuffer.splice(0, 1);
    } else {
      this._body.splice(0, 1);
    }

    this.body.push(this.nextHeadPosition(this.getHead(), this.direction));
    this._lastStepDirection = this.direction;
  }

  getTail() {
    return this._body[0];
  }

  getHead() {
    return this._body[this._body.length - 1];
  }

  nextHeadPosition(currentHead: Point, direction: Directions): Point {
    let { x, y } = currentHead;

    switch (direction) {
      case 'down':
        y++;
        break;
      case 'up':
        y--;
        break;
      case 'left':
        x--;
        break;
      case 'right':
        x++;
        break;
    }

    // NOTE: boundary handling
    x = (x + this.maxX + 1) % (this.maxX + 1);
    y = (y + this.maxY + 1) % (this.maxY + 1);

    return { x, y };
  }

  isDead(): boolean {
    return this._body.some((cell1, i1) =>
      this._body.some(
        (cell2, i2) => i1 !== i2 && cell1.x === cell2.x && cell1.y === cell2.y
      )
    );
  }

  totalLength(): number {
    return this._body.length + this.foodBuffer.length;
  }
}
