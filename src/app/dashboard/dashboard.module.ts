import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RecordsService } from '../common/services/records.service';
import { SharedModule } from '../common/common.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDaterangepickerMd
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    RecordsService
  ]
})
export class DashboardModule {}
