import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
      DragDropModule,
      MatSidenavModule,
      FormsModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      MatOptionModule,
      MatToolbarModule,
      MatListModule,
      MatMenuModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatDialogModule,
      MatInputModule,
      MatCardModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      MatSnackBarModule
    ]
 
})
export class MaterialModule {}

