# NgxSimpleCalendar

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.4.


## Introduction
Ngx-simple-calendar is an open source, light-weight, highly customizable calendar component for Angular. Allows users to customize day, month templates with event objects of their choosing, providing a simple API. 

StackBlitz sample project example: https://stackblitz.com/edit/angular-ngx-simple-calendar

## Usage

First install the package with yarn or npm

    npm install ngx-simple-calendar

Then import the `NgxSimpleCalendarModule`

    import { BrowserModule } from '@angular/platform-browser';  
    import { NgModule } from '@angular/core';  
      
    import { AppComponent } from './app.component';  
    import {NgxSimpleCalendarModule} from 'ngx-simple-calendar'; 
      
    @NgModule({  
      declarations: [AppComponent],  
      imports: [BrowserModule, NgxSimpleCalendarModule],  
      providers: [],  
      bootstrap: [AppComponent]  
    })  
    export class AppModule { }

Use in your components

    ---app.component.html
    
    <div class="container">  
     <ngx-simple-calendar></ngx-simple-calendar>  
    </div>
    
    ----app.component.scss---
    
    .container {  
      position: relative;  
      height: 40rem;  
      width: 40rem;  
      margin: 2rem;  
    }
    
> **IMPORTANT** : For Positioning and dimentions: The wrapper component must have **relative** positioning, and have determined dimensions.

## Custom templates

Here I will list the possibility of customized templates for certain features of the calendar. These are all optional and override the default templates in the component, giving the variables provided by the component for that day.

### For days in month

Defining an ng-template with **`#day`** inside the component lets you have access to the following properties, which will allow you to make your own custom templates, with custom components as well, as days in the calendar.

|             |Type   |Meaning                      									|
|-------------|-------|-----------------------------------------------------------------|
|number       |number |The number of the day in current month view            			|
|month        |number |The number of the month in the year. 0-indexed.           		|
|year		  |number |The year of the current month view            					|
|today		  |boolean|Is this day in the month, today's date ?							|
|weekend      |boolean|Is this day in the month, a weekend day ?						|
|activeMonth  |boolean|Does this day in the month view, belong to current month viewed ?|
|startDateTime|Date   |Date javascript object of day start								|
|endDateTime  |Date   |Date javascript object of day end								|



	---app.component.html----
	
	 <ngx-simple-calendar [options]="options2" [events]="events">  
		     <ng-template #day 
		     let-date="number" let-events="events" let-active="today" let-weekend="weekend"> 
		      
				 <div class="round-date" [class.active]="active" [class.weekend]="weekend">  
				     <span>{{date}}</span>  
				     <div class="events">  
					     <div class="event" 
					     [style.background-color]="event.data.color" 
					     *ngFor="let event of events" 
					     [title]="event.data.name + event.data.description"></div>  
					 </div>  
				</div>  
				
		     </ng-template>  
     </ngx-simple-calendar>

	---app.component.scss---
	
	.round-date {
		  position: absolute;  // The wrapper is positioned relative, so...
	      top: 0;  
	      bottom: 0;  
	      left: 0;  
	      right: 0;  
	      display: flex;  
	      flex-direction: column;   
	      background-color: #f5f5f5;  
	      border: 1px solid #dedede;  
	      border-radius: 25%;  
	      padding: 0.55rem; 
	      margin: 0.5rem; 
	      &.active {  
		      border: 2px dashed #adadad;  
		      background: #eaeaea;  
	     }  
	     &.weekend {  
		      background: #ffe8e8;  
	     }
	 }  
	 .....

### For Days of the week

Defining an ng-template with **`#weekDays`** inside the component lets you have access to the following properties:

|              |Type   |Meaning                      			|
|--------------|-------|----------------------------------------|
|id|number     |Id of day of the week. 0-Sunday...6-Saturday    |
|translationKey|string|Translation key for translating  		|
|name|string|Name in english            						|	

### For Top bar with month-year and navigating functions

Defining an ng-template with **`#topBar`** inside the component lets you have access to the following properties:

|              |Type   |Meaning                      			|
|--------------|-------|----------------------------------------|
|month|CalendarMonth|Month of currentView properties as listed above    |
|year|number|Year 		|
|setNextMonth|Function|Function to call when wanting to change current month view to the next |        					
|setPreviousMonth|Function|Function to call when wanting to change current month view to the previous| 
							

## Options

The following keys on the Input property **`options`** add customizations to the calendar.

|              |Type   |Meaning                      			|
|--------------|-------|----------------------------------------|
|outline|boolean     |Have bordered days in calendar    |
|evenDayDimensions|boolean|The days on the calendar to be 1:1 aspect ratio.  		|        						

## Events

The following keys on the Input property array **`events`** add events to the calendar.

|              |Type   |      Meaning                      			|   required |
|--------------|-------|----------------------------------------|----| 
|startDateTime|Date|Start date-time of event    | yes|
|endDateTime|Date|End date-time of event  |no |
|data|any|Any data that is to be associated to event  |no |

### How to use events:

**`Events`** binds to an array of **`CalendarEvent`** objects defined above.

 - startDateTime is required and signifies the start of the event
 - endDateTime is not required, and when it is not given, when the **`event`** will only be added to the day (accessible through template of `#day` ) that holds the given startDateTime (Like a whole day event)
 - When both are given the **`event`** is added to the given interval of day, meaning if the interval is between more days, it will be added on all days on which it is a part of (accessible through template of `#day` )
 - When wanting to update events, just reassign events on the binded property, then the calendar will update it's view and data. Check stackblitz example for help..


## Plans for Future Versions

 - Extended API for non-template/default variation. ( For events first and foremost)
 - Year picker, today navigation.
 - Aspect ratio API and Positioning and dimensions (Mainly for ease of use)
 - General API improvements and extensions. (Backwards compatible, without breaking-changes) 

