import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'select-star-rating',
  templateUrl: './select-star-rating.component.html',
  styleUrls: ['./select-star-rating.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: SelectStarRatingComponent },
  ],
})
export class SelectStarRatingComponent implements OnChanges {
  @Input('max-stars') public maxStars: number = 5;

  @Input('star-size') starSize: number = 30;
  @Output('on-value-change') onValueChange = new EventEmitter<number | null>();

  private _pointedValue: number | null = null;
  private _value: number | null = null;
  get value() {
    return this._value;
  }
  @Input('value') set value(newValue) {
    if (this.value !== newValue) this.onValueChange?.emit(newValue);
    this._value = newValue;
  }

  private _numberArray: number[];
  get numberArray() {
    return this._numberArray;
  }
  createNumberArray(maxStars: number) {
    const result = [];
    for (let i = 1; i <= maxStars; i++) result.push(i);

    return result;
  }

  constructor() {
    this._numberArray = this.createNumberArray(this.maxStars);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.maxStars?.previousValue !== changes.maxStars?.currentValue) {
      this._numberArray = this.createNumberArray(changes.maxStars.currentValue);
    }
  }

  handleStarMouseEnter = (value: number) => {
    this._pointedValue = value;
  };

  handleStarMouseLeave = (value: number) => {
    this._pointedValue = null;
  };

  handleStarClick = (value: number) => {
    this.value = value;
  };

  toBeHighlighted = (value: number): boolean => {
    const target = this._pointedValue ?? this.value ?? 0;
    if (target === 0) return false;
    return value <= target;
  };
}
