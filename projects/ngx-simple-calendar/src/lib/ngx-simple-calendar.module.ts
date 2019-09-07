import { NgModule } from '@angular/core';
import { NgxSimpleCalendarComponent } from './ngx-simple-calendar.component';
import {CommonModule} from '@angular/common';
import {NgxSimpleCalendarService} from './ngx-simple-calendar.service';

@NgModule({
  declarations: [NgxSimpleCalendarComponent],
  providers: [NgxSimpleCalendarService],
  imports: [CommonModule],
  exports: [NgxSimpleCalendarComponent]
})
export class NgxSimpleCalendarModule { }
