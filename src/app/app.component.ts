import {Component} from '@angular/core';
import {sampleOne, sampleTwo} from './sample-events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-calendar';

  options1 = {
    outline: false
  };

  options2 = {
    outline: false,
    evenDayDimensions: true
  };

  events = sampleOne;

  addDate() {
    this.events = sampleTwo;
  }
}
