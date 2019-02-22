import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicInputComponent } from './components/basic-input/basic-input.component';
import { ButtonComponent } from './components/button/button.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { AlertComponent } from './components/alert/alert.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AlertService } from './components/alert/alert.service';
import { RadioComponent } from './components/radio/radio.component';
import { ListTable } from './components/table/list-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BasicInputComponent,
    ButtonComponent,
    ToggleComponent,
    AlertComponent,
    RadioComponent,
    PaginatorComponent,
    ListTable
  ],
  exports: [
    BasicInputComponent,
    ButtonComponent,
    ToggleComponent,
    AlertComponent,
    RadioComponent,
    PaginatorComponent,
    ListTable
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonModule,
      providers: [
        AlertService
      ]
    };
  }
}
