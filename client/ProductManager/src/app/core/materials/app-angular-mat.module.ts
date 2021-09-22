import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MODULES_LIST = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: MODULES_LIST,
  exports: MODULES_LIST,
})
export class AppAngularMaterialModule {}
