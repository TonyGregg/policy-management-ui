import {NgModule} from '@angular/core';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule,
} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [MatNativeDateModule, MatDatepickerModule, MatIconModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, FormsModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatListModule,
    MatRadioModule],
  exports: [MatNativeDateModule, FormsModule, MatDatepickerModule, MatIconModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatListModule, MatRadioModule],

})
export class MaterialModule {}
