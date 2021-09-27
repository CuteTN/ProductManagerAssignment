import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

const MODULES_LIST = [
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatDividerModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: MODULES_LIST,
  exports: MODULES_LIST,
})
export class AppAngularMaterialModule {}
