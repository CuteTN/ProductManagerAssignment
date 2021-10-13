import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'notification-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css'],
})
export class MyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyDialogData
  ) {
    this.applyDefaultData();

    if(data.disableClose)
      dialogRef.disableClose = this.data.disableClose;
    if(data.duration)
      setTimeout(() => dialogRef.close({ reason: "TIME_OUT" }), data.duration);
  }

  applyDefaultData = () => {
    this.data.text = this.data.text ?? "";
    this.data.loading = this.data.loading ?? false;
    this.data.buttons = this.data.buttons ?? [];
    this.data.disableClose = this.data.disableClose ?? false;
  }

  handleButtonClick(button: DialogButtonConfig) {
    button?.handle?.();
  }
}

export interface MyDialogData {
  title: string;
  text?: string;
  loading?: boolean;
  duration?: number;
  buttons?: DialogButtonConfig[],
  disableClose?: boolean
};

interface DialogButtonConfig {
  text: string;
  color?: "primary" | "accent" | "warn";
  handle?: () => void;
}