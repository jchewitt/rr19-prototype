import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
