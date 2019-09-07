import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxSimpleCalendarModule} from 'ngx-simple-calendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSimpleCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
