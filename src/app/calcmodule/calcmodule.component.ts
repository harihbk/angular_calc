import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList } from '@angular/core';
import { scheduleData } from '../datasource';


import { ViewEncapsulation, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SelectedEventArgs, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectComponent, ChangeEventArgs, MultiSelectChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

import {
  ScheduleComponent, GroupModel, DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
  TimelineViewsService, TimelineMonthService, TimelineYearService, View, EventSettingsModel, Timezone, CurrentAction,
  CellClickEventArgs, ResourcesModel, EJ2Instance, PrintService, ExcelExportService, ICalendarExportService, CallbackFunction, Schedule, ActionEventArgs, ToolbarActionArgs
} from '@syncfusion/ej2-angular-schedule';


import { addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { AjaxOption, CustomDataAdaptor, DataManager, ODataV4Adaptor, Predicate, Query, RemoteSaveAdaptor, UrlAdaptor } from '@syncfusion/ej2-data';
import {
  ClickEventArgs, ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs
} from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import {  WebApiAdaptor } from '@syncfusion/ej2-data';
import { CalendarService } from '../calcmodule/services/calendar.service';
import { environment } from 'src/environments/environment';
//this.service.GetAccessToken
import { Ajax } from "@syncfusion/ej2-base";
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { classList } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { createElement } from '@syncfusion/ej2-base';
import { Subject } from 'rxjs';


declare var moment: any;

@Component({
  selector: 'app-calcmodule',
  templateUrl: './calcmodule.component.html',
  styleUrls: ['./calcmodule.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
    TimelineViewsService, TimelineMonthService, TimelineYearService, PrintService, ExcelExportService, ICalendarExportService],
  encapsulation: ViewEncapsulation.None
})
export class CalcmoduleComponent implements OnInit {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  @ViewChild('workWeekDaysObj') workWeek: MultiSelectComponent;
  @ViewChild('resouresObj') resources: MultiSelectComponent;
  @ViewChild('eventTypeObj') eventTypeObj: DropDownListComponent;
  @ViewChild('titleObj') titleObj: TextBoxComponent;
  @ViewChild('notesObj') notesObj: TextBoxComponent;
  @ViewChild('viewSwitch') viewSwitch: SwitchComponent;
  @ViewChild('groupSwitch') groupSwitch: SwitchComponent;
  @ViewChild('gridlinesSwitch') gridlinesSwitch: SwitchComponent;
  @ViewChild('rowHeightSwitch') rowHeightSwitch: SwitchComponent;
  @ViewChild('tooltipSwitch') tooltipSwitch: SwitchComponent;
  @ViewChild('dragSwitch') dragSwitch: SwitchComponent;
  @ViewChild('el') span: QueryList<any>;
  public dateValue: Object = new Date();



  public showFileList = false;
  public multiple = false;
  public buttons: Record<string, any> = { browse: this.importTemplateFn({ text: 'Import' })[0] as HTMLElement };
  public intl: Internationalization = new Internationalization();
  public currentView: View = 'Week';
  public liveTimeUpdate: string = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Calcutta' });
  public group: GroupModel = { resources: ['Calendars'] };
  public resourceDataSource: Record<string, any>[] = [
    { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
    { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
    { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
    { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
  ];
  public resourceQuery: Query = new Query().where('CalendarId', 'equal', 1);
  public allowMultiple = true;
  public isTimelineView = false;
  public exportItems: ItemModel[] = [
    { text: 'iCalendar', iconCss: 'e-icons e-export' },
    { text: 'Excel', iconCss: 'e-icons e-export-excel' }
  ];
  public checkboxMode = 'CheckBox';
  public firstDayOfWeek = 0;
  public workDays: number[] = [1, 2, 3, 4, 5];
  public calendarsValue: number[] = [1];
  public fields: Record<string, any> = { text: 'text', value: 'value' };
  public calendarFields: Record<string, any> = { text: 'CalendarText', value: 'CalendarId' };
  public dayStartHourValue: Date = new Date(new Date().setHours(0, 0, 0));



  public dayEndHourValue: Date = new Date(new Date().setHours(23, 59, 59));
  public workStartHourValue: Date = new Date(new Date().setHours(9, 0, 0));
  public workEndHourValue: Date = new Date(new Date().setHours(18, 0, 0));
  public weekDays: Record<string, any>[] = [
    { text: 'Sunday', value: 0 },
    { text: 'Monday', value: 1 },
    { text: 'Tuesday', value: 2 },
    { text: 'Wednesday', value: 3 },
    { text: 'Thursday', value: 4 },
    { text: 'Friday', value: 5 },
    { text: 'Saturday', value: 6 }
  ];


  public groupDays: Record<string, any>[] = [
    { text: 'Day', value: 0 },
    { text: 'Week', value: 1 },
    { text: 'WorkWeek', value: 2 },
    { text: 'Month', value: 3 },
    { text: 'Year', value: 4 },
    { text: 'Agenda', value: 5 },

  ];

  public show = true;

  public user = [{name:"Theo  ",tablecolor:'#ff7a91'},{name:"Mat",tablecolor:'#7f7aff'},{name:"Raj",tablecolor:'#c3bc36'},{name:"Paul",tablecolor:'#cd7bea'},{name:"Selva",tablecolor:'#84ecb1'},{name:"David",tablecolor:'#e6928c'},{name:"Davibillad",tablecolor:'#e6928c'}];;



  public timezoneData: Record<string, any>[] = [
    { text: 'UTC -12:00', value: 'Etc/GMT+12' },
    { text: 'UTC -11:00', value: 'Etc/GMT+11' },
    { text: 'UTC -10:00', value: 'Etc/GMT+10' },
    { text: 'UTC -09:00', value: 'Etc/GMT+9' },
    { text: 'UTC -08:00', value: 'Etc/GMT+8' },
    { text: 'UTC -07:00', value: 'Etc/GMT+7' },
    { text: 'UTC -06:00', value: 'Etc/GMT+6' },
    { text: 'UTC -05:00', value: 'Etc/GMT+5' },
    { text: 'UTC -04:00', value: 'Etc/GMT+4' },
    { text: 'UTC -03:00', value: 'Etc/GMT+3' },
    { text: 'UTC -02:00', value: 'Etc/GMT+2' },
    { text: 'UTC -01:00', value: 'Etc/GMT+1' },
    { text: 'UTC +00:00', value: 'Etc/GMT' },
    { text: 'UTC +01:00', value: 'Etc/GMT-1' },
    { text: 'UTC +02:00', value: 'Etc/GMT-2' },
    { text: 'UTC +03:00', value: 'Etc/GMT-3' },
    { text: 'UTC +04:00', value: 'Etc/GMT-4' },
    { text: 'UTC +05:00', value: 'Etc/GMT-5' },
    { text: 'UTC +05:30', value: 'Asia/Calcutta' },
    { text: 'UTC +06:00', value: 'Etc/GMT-6' },
    { text: 'UTC +07:00', value: 'Etc/GMT-7' },
    { text: 'UTC +08:00', value: 'Etc/GMT-8' },
    { text: 'UTC +09:00', value: 'Etc/GMT-9' },
    { text: 'UTC +10:00', value: 'Etc/GMT-10' },
    { text: 'UTC +11:00', value: 'Etc/GMT-11' },
    { text: 'UTC +12:00', value: 'Etc/GMT-12' },
    { text: 'UTC +13:00', value: 'Etc/GMT-13' },
    { text: 'UTC +14:00', value: 'Etc/GMT-14' }
  ];
  public timeSlotDuration: Record<string, any>[] = [
    { Name: '1 hour', Value: 60 },
    { Name: '1.5 hours', Value: 90 },
    { Name: '2 hours', Value: 120 },
    { Name: '2.5 hours', Value: 150 },
    { Name: '3 hours', Value: 180 },
    { Name: '3.5 hours', Value: 210 },
    { Name: '4 hours', Value: 240 },
    { Name: '4.5 hours', Value: 270 },
    { Name: '5 hours', Value: 300 },
    { Name: '5.5 hours', Value: 330 },
    { Name: '6 hours', Value: 360 },
    { Name: '6.5 hours', Value: 390 },
    { Name: '7 hours', Value: 420 },
    { Name: '7.5 hours', Value: 450 },
    { Name: '8 hours', Value: 480 },
    { Name: '8.5 hours', Value: 510 },
    { Name: '9 hours', Value: 540 },
    { Name: '9.5 hours', Value: 570 },
    { Name: '10 hours', Value: 600 },
    { Name: '10.5 hours', Value: 630 },
    { Name: '11 hours', Value: 660 },
    { Name: '11.5 hours', Value: 690 },
    { Name: '12 hours', Value: 720 }
  ];
  public timeSlotFields = { text: 'Name', value: 'Value' };
  public timeSlotCount: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public timeSlotDurationValue = 60;
  public timeSlotCountValue = 2;
  public timeFormatData: Record<string, any>[] = [
    { Name: '12 hours', Value: 'hh:mm a' },
    { Name: '24 hours', Value: 'HH:mm' }
  ];
  public timeFormatValue = 'hh:mm a';
  public weekNumberData: Record<string, any>[] = [
    { Name: 'Off', Value: 'Off' },
    { Name: 'First Day of Year', Value: 'FirstDay' },
    { Name: 'First Full Week', Value: 'FirstFullWeek' },
    { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
  ];
  public weekNumberValue = 'Off';
//  public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
  @ViewChild('menuObj') public menuObj: ContextMenuComponent;
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
    {
      text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
      items: [
        { text: 'Edit Occurrence', id: 'EditOccurrence' },
        { text: 'Edit Series', id: 'EditSeries' }
      ]
    },
    { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
    {
      text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
      items: [
        { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
        { text: 'Delete Series', id: 'DeleteSeries' }
      ]
    }
  ];
  apicalendarId: any;
  apipublicKey: any;





  public profilePopup: Popup;


  public selectedDate: Date = new Date(2021, 10, 17);
 // private calendarId ='harihbk95@gmail.com';
 // private publicKey =  environment.CalendarAPIKEY;

  public dataManger = new DataManager({
    url:
      "https://www.googleapis.com/calendar/v3/calendars/primary/events" ,
      headers: [
        { 'Accept': 'application/json' },
        { 'Content-Type': 'application/json' },
        { 'Authorization': 'Bearer '+this.service.GetAccessToken }
      ],
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });


  public dataSource: Object[];
  public date: Date = new Date(2021, 10, 14);
  public eventSettings: EventSettingsModel = { dataSource: this.dataManger };
  userdata: any;
  modifieduserdata: any;
  temp: any = true;
  inc: number = 1;
  currentevents: any=[];




constructor(
  public service : CalendarService,
  private cd: ChangeDetectorRef,
  public http:HttpClient,

){
   console.log(this.eventSettings);
}

onClick(ev){
  this.scheduleObj.selectedDate = ev.value
  this.selectedDate = ev.value
 console.log(ev.value)
}




onActionBegin(args: ActionEventArgs & ToolbarActionArgs):void {


  if (args.requestType === "eventCreate") {
    args.cancel = true;
    var app = isNullOrUndefined(args.data[0]) ? args.data : args.data[0];
    var resource;
    if (!isNullOrUndefined(app.RecurrenceRule)) {
      resource = {
        summary: app.Subject,
        location: app.Location,
        start: {
          dateTime: app.StartTime,
          timeZone: "UTC"
        },
        end: {
          dateTime: app.EndTime,
          timeZone: "UTC"
        },
        recurrence: [
          "RRULE:" + app.RecurrenceRule,
        ]
      };
    } else {
      resource = {
        summary: app.Subject,
        location: app.Location,
        start: {
          dateTime: app.StartTime,
          timeZone: "UTC"
        },
        end: {
          dateTime: app.EndTime,
          timeZone: "UTC"
        }
      };
    }




      let schObj = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0]
      var http = new XMLHttpRequest();
      var url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
      http.open('POST', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Authorization',  'Bearer '+this.service.GetAccessToken);
      http.onreadystatechange = function(data:any) {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        schObj.refreshEvents()

      }
      }
      this.userdata =args.data[0];
      console.log(this.userdata );
      this.modifieduserdata = {
      "end": {
      "dateTime": this.userdata.EndTime
      },
      "start": {
      "dateTime":  this.userdata.StartTime
      },
      "summary": this.userdata.Subject
      }
      var params = JSON.stringify(this.modifieduserdata);
      http.send(params);
  }




  if (args.requestType === "eventChange") {

    args.cancel = true;
    var app = isNullOrUndefined(args.data[0]) ? args.data : args.data[0];
    if (!isNullOrUndefined(app.RecurrenceRule)) {
      resource = {
        id: app.Id,
        summary: app.Subject,
        location: app.Location,
        start: {
          dateTime: app.StartTime,
          timeZone: "UTC"
        },
        end: {
          dateTime: app.EndTime,
          timeZone: "UTC"
        },
        recurrence: [
          "RRULE:" + app.RecurrenceRule,
        ]
      };
    } else {
      resource = {
        id: app.Id,
        summary: app.Subject,
        location: app.Location,
        start: {
          dateTime: app.StartTime,
          timeZone: "UTC"
        },
        end: {
          dateTime: app.EndTime,
          timeZone: "UTC"
        }
      };






      let schObj = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0]
      var http = new XMLHttpRequest();
      var url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${ resource.id }`;
      http.open('UPDATE', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Authorization',  'Bearer '+this.service.GetAccessToken);
      http.onreadystatechange = function(data:any) {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        schObj.refreshEvents()
      }
      }

      var params = JSON.stringify(resource);
      http.send(params);



    }



          let schObj = (document.querySelector(".e-schedule") as any)
          .ej2_instances[0]
      var http = new XMLHttpRequest();
      let dat =args.data;
      var url =  `https://www.googleapis.com/calendar/v3/calendars/primary/events/${resource.id}`;
      http.open('PUT', url, true);
      //Send the proper header information along with the request
      http.setRequestHeader('Accept',  'application/json');
      http.setRequestHeader('Authorization',  'Bearer '+this.service.GetAccessToken);
      http.onreadystatechange = function(data:any) {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            schObj.refreshEvents();
          }
      }


      var params = JSON.stringify(resource);

      http.send(params);

  }






  if (args.requestType === "eventRemove") {
    args.cancel = true;
    var app = isNullOrUndefined(args.data[0]) ? args.data : args.data[0];
    if (isNullOrUndefined(app.occurrence)) {
      let resource = {
        id: app.Id,
        summary: app.Subject,
        location: app.Location,
        start: {
          dateTime: app.StartTime
        },
        end: {
          dateTime: app.EndTime
        }
      };



      let schObj = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0]
  var http = new XMLHttpRequest();
  let dat =args.data;
  var url =  `https://www.googleapis.com/calendar/v3/calendars/primary/events/${resource.id}`;
  http.open('DELETE', url, true);
  //Send the proper header information along with the request
  http.setRequestHeader('Accept',  'application/json');
  http.setRequestHeader('Authorization',  'Bearer '+this.service.GetAccessToken);
  http.onreadystatechange = function(data:any) {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 204) {
        schObj.refreshEvents();
      }
  }
  var params = JSON.stringify(resource);
  http.send(params);


    } else {
      resource = {
        recurringEventId: app.parent.Id,
        originalStartTime: {
          dateTime: app.occurrence.StartTime,
          timeZone: "UTC"
        },
        start: {
          dateTime: app.occurrence.StartTime,
          timeZone: "UTC"
        },
        end: {
          dateTime: app.occurrence.EndTime,
          timeZone: "UTC"
        },
        status: "cancelled"
      };




      let schObj = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0]
  var http = new XMLHttpRequest();
  let dat =args.data;
  var url =  `https://www.googleapis.com/calendar/v3/calendars/primary/events/${resource.id}`;
  http.open('DELETE', url, true);
  //Send the proper header information along with the request
  http.setRequestHeader('Accept',  'application/json');
  http.setRequestHeader('Authorization',  'Bearer '+this.service.GetAccessToken);
  http.onreadystatechange = function(data:any) {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        schObj.refreshEvents();
      }
  }
  var params = JSON.stringify(resource);
  http.send(params);

    }
  }




}


onActionComplete(args: ActionEventArgs):void {
  let scheduleElement: HTMLElement = document.getElementById('schedule') as HTMLElement;
  if (args.requestType === 'toolBarItemRendered') {
      let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      userIconEle.onclick = () => {
          this.profilePopup.relateTo = userIconEle;
          this.profilePopup.dataBind();
          if (this.profilePopup.element.classList.contains('e-popup-close')) {
              this.profilePopup.show();
          } else {
              this.profilePopup.show();
          }
      };
  }

  let userContentEle: HTMLElement = createElement('div', {
      className: 'e-profile-wrapper'
  });
  scheduleElement.parentElement.appendChild(userContentEle);

  let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
  let getDOMString: (data: object) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
      '</div><div class="content-wrap"><div class="name">Nancy</div>' +
      '<div class="destination">Product Manager</div><div class="status">' +
      '<div class="status-icon"></div>Online</div></div></div>');
  let output: NodeList = getDOMString({});
  this.profilePopup = new Popup(userContentEle, {
      content: output[0] as HTMLElement,
      relateTo: userIconEle,
      position: { X: 'left', Y: 'bottom' },
      collision: { X: 'flip', Y: 'flip' },
      targetType: 'relative',
      viewPortElement: scheduleElement,
      width: 185,
      height: 80
  });
  this.profilePopup.hide();
}



ngOnInit(){

}



   onDataBinding(e: Record<string, any>): void {
    const items: Record<string, any>[] = (
      e.result as Record<string, Record<string, any>[]>
    ).items;



    const scheduleData: Record<string, any>[] = [];
    // if (items.length > 0) {

      const date: Date = new Date(2021, 11, 15);
     var dataSource =  {
             Id:'12',
            Subject: 'nila',
            StartTime: new Date(),
            EndTime: new Date(),
            IsAllDay: false,
    };


    let currentViewDates: Date[] = this.scheduleObj.getCurrentViewDates() as Date[];
    let startDate: Date = currentViewDates[0] as Date;
    let endDate: Date = currentViewDates[currentViewDates.length - 1] as Date;
    console.log(startDate);
    console.log(endDate);


      for (const event of items) {
        let when: string = event.start.dateTime as string;
        let start: string = event.start.dateTime as string;
        let end: string = event.end.dateTime as string;
        if (!when) {
          when = event.start.date as string;
          start = event.start.date as string;
          end = event.end.date as string;
        }

        scheduleData.push({
          Id: event.id,
          Subject: event.summary,
          StartTime: new Date(start),
          EndTime: new Date(end),
          IsAllDay: !event.start.dateTime,
        });
      }
   // }
    e.result = scheduleData;
    // console.log(scheduleData);

    console.log([this.scheduleObj.startHour,this.scheduleObj.endHour]);


    this.service.schedularobj.next(this.scheduleObj)

  }

  public ngAfterViewChecked(): void {
    this.viewSwitch?.element?.setAttribute('tabindex', '-1');
    this.groupSwitch?.element?.setAttribute('tabindex', '-1');
    this.gridlinesSwitch?.element?.setAttribute('tabindex', '-1');
    this.rowHeightSwitch?.element?.setAttribute('tabindex', '-1');
    this.tooltipSwitch?.element?.setAttribute('tabindex', '-1');
    this.dragSwitch?.element?.setAttribute('tabindex', '-1');
  }

  public importTemplateFn(data: Record<string, any>): NodeList {
    const template: string = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
    return compile(template.trim())(data) as NodeList;
  }

  public generateEvents(): Record<string, any>[] {

    const eventData: Record<string, any>[] = [];
    const eventSubjects: string[] = [
      'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
      'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day', 'MoonShiners',
      'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
      'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
    ];
    const weekDate: Date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
    let startDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
    let endDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
    eventData.push({
      Id: 1,
      Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
      StartTime: startDate,
      EndTime: endDate,
      Location: '',
      Description: 'Event Scheduled',
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
      IsAllDay: false,
      IsReadonly: false,
      CalendarId: 1
    });
    for (let a = 0, id = 2; a < 500; a++) {
      const month: number = Math.floor(Math.random() * (11 - 0 + 1) + 0);
      const date: number = Math.floor(Math.random() * (28 - 1 + 1) + 1);
      const hour: number = Math.floor(Math.random() * (23 - 0 + 1) + 0);
      const minutes: number = Math.floor(Math.random() * (59 - 0 + 1) + 0);
      const start: Date = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
      const end: Date = new Date(start.getTime());
      end.setHours(end.getHours() + 2);
      startDate = new Date(start.getTime());
      endDate = new Date(end.getTime());
      eventData.push({
        Id: id,
        Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
        StartTime: startDate,
        EndTime: endDate,
        Location: '',
        Description: 'Event Scheduled',
        IsAllDay: id % 10 === 0,
        IsReadonly: endDate < new Date(),
        CalendarId: (a % 4) + 1
      });
      id++;
    }
    if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      Timezone.prototype.offset = (date: Date, zone: string): number => moment.tz.zone(zone).utcOffset(date.getTime());
    }
    const overviewEvents: { [key: string]: Date }[] = extend([], eventData, null, true) as { [key: string]: Date }[];
    const timezone: Timezone = new Timezone();
    const utcTimezone: never = 'UTC' as never;
    const currentTimezone: never = timezone.getLocalTimezoneName() as never;
    for (const event of overviewEvents) {
      event.StartTime = timezone.convert(event.StartTime, utcTimezone, currentTimezone);
      event.EndTime = timezone.convert(event.EndTime, utcTimezone, currentTimezone);
    }


    return overviewEvents;
  }

  public onToolbarCreated(): void {
    setInterval(() => { this.updateLiveTime(this.scheduleObj ? this.scheduleObj.timezone : 'UTC'); }, 1000);
  }

 // public onToolbarItemClicked(args: ClickEventArgs): void {

  public onToolbarItemClicked(args): void {
   alert(args)
    switch (args) {
      case 'Day':
        this.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
        break;
      case 'Week':
        this.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
        break;
      case 'WorkWeek':
        this.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
        break;
      case 'Month':
        this.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
        break;
      case 'Year':
        this.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
        break;
      case 'Agenda':
        this.currentView = 'Agenda';
        break;
      case 'New Event':
        const eventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(eventData, 'Add', true);
        break;
      case 'New Recurring Event':
        const recEventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
        break;
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
    }
  }


  public onToolbarItemClicked1(args): void {

    switch (args.target.value) {
      case 'Day':
        this.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
        break;
      case 'Week':
        this.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
        break;
      case 'WorkWeek':
        this.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
        break;
      case 'Month':
        this.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
        break;
      case 'Year':
        this.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
        break;
      case 'Agenda':
        this.currentView = 'Agenda';
        break;
      case 'New Event':
        const eventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(eventData, 'Add', true);
        break;
      case 'New Recurring Event':
        const recEventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
        break;
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
    }
  }


  private getEventData(): Record<string, any> {
    const date: Date = this.scheduleObj.selectedDate;
    return {
      Id: this.scheduleObj.getEventMaxID(),
      Subject: '',
      StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
      EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
      Location: '',
      Description: '',
      IsAllDay: false,
      CalendarId: 1
    };
  }

  public updateLiveTime(timezone: string = 'UTC'): void {
    this.liveTimeUpdate = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
  }

  public onTimelineViewChange(args: SwitchEventArgs): void {
    this.isTimelineView = args.checked;
    switch (this.scheduleObj.currentView) {
      case 'Day':
      case 'TimelineDay':
        this.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
        break;
      case 'Week':
      case 'TimelineWeek':
        this.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
        break;
      case 'WorkWeek':
      case 'TimelineWorkWeek':
        this.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
        break;
      case 'Month':
      case 'TimelineMonth':
        this.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
        break;
      case 'Year':
      case 'TimelineYear':
        this.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
        break;
      case 'Agenda':
        this.currentView = 'Agenda';
        break;
    }
  }

  public onAllowMultiDrag(args: SwitchEventArgs): void {
    this.scheduleObj.allowMultiDrag = args.checked;
  }

  public onGroupingChange(args: SwitchEventArgs): void {
    this.scheduleObj.group.resources = args.checked ? ['Calendars'] : [];
  }

  public onGridlinesChange(args: SwitchEventArgs): void {
    this.scheduleObj.timeScale.enable = args.checked;
  }

  public onRowAutoHeightChange(args: SwitchEventArgs): void {
    this.scheduleObj.rowAutoHeight = args.checked;
  }

  public onTooltipChange(args: SwitchEventArgs): void {
    this.scheduleObj.eventSettings.enableTooltip = args.checked;
  }

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  public onSettingsClick(args): void {
    const settingsPanel: Element = document.querySelector('.overview-content .right-panel');
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      this.workWeek.refresh();
      this.resources.refresh();
    } else {
      addClass([settingsPanel], 'hide');
    }


  }

  public getWeatherImage(value: Date): string {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
      case 1:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
      case 2:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
      case 3:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
      case 4:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
      case 5:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
      case 6:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
      default:
        return null;
    }
  }

  public getDateHeaderText(value: Date): string {
    return this.intl.formatDate(value, { skeleton: 'Ed' });
  }

  public onWeekDayChange(args: ChangeEventArgs): void {
    this.scheduleObj.firstDayOfWeek = args.value as number;
  }

  public onWorkWeekDayChange(args: MultiSelectChangeEventArgs): void {
    this.scheduleObj.workDays = args.value as number[];
  }

  public onResourceChange(args: MultiSelectChangeEventArgs): void {
    let resourcePredicate: Predicate;
    for (const value of args.value) {
      if (resourcePredicate) {
        resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value));
      } else {
        resourcePredicate = new Predicate('CalendarId', 'equal', value);
      }
    }
    this.scheduleObj.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) :
      new Query().where('CalendarId', 'equal', 1);
  }

  public onTimezoneChange(args: ChangeEventArgs): void {
    this.scheduleObj.timezone = args.value as string;

    this.updateLiveTime(this.scheduleObj.timezone);
    document.querySelector('.schedule-overview #timezoneBtn').innerHTML =
      '<span class="e-btn-icon e-icons e-time-zone e-icon-left"></span>' + args.itemData.text;
  }

  public onDayStartHourChange(args: TimeEventArgs): void {

    this.scheduleObj.startHour = this.intl.formatDate(args.value, { skeleton: 'Hm' });
    console.log(this.scheduleObj.startHour);


  }

  public onDayEndHourChange(args: TimeEventArgs): void {
    this.scheduleObj.endHour = this.intl.formatDate(args.value, { skeleton: 'Hm' });

  }

  public onWorkStartHourChange(args: TimeEventArgs): void {
    this.scheduleObj.workHours.start = this.intl.formatDate(args.value, { skeleton: 'Hm' });

  }

  public onWorkEndHourChange(args: TimeEventArgs): void {
    this.scheduleObj.workHours.end = this.intl.formatDate(args.value, { skeleton: 'Hm' });

  }

  public onTimescaleDurationChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeScale.interval = args.value as number;

  }

  public onTimescaleIntervalChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeScale.slotCount = args.value as number;

  }

  public onTimeFormatChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeFormat = args.value as string;

  }

  public onWeekNumberChange(args: ChangeEventArgs): void {
    if (args.value === 'Off') {
      this.scheduleObj.showWeekNumber = false;
    } else {
      this.scheduleObj.showWeekNumber = true;
      this.scheduleObj.weekRule = args.value as any;
    }
  }

  public getResourceData(data: Record<string, any>): Record<string, any> {
    const resources: ResourcesModel = this.scheduleObj.getResourceCollections()[0];
    const resourceData: Record<string, any> = (resources.dataSource as Record<string, any>[]).filter((resource: Record<string, any>) =>
      resource.CalendarId === data.CalendarId)[0] as Record<string, any>;
    return resourceData;
  }

  public getHeaderStyles(data: Record<string, any>): Record<string, any> {
    if (data.elementType === 'cell') {
      return { 'align-items': 'center', color: '#919191' };
    } else {
      const resourceData: Record<string, any> = this.getResourceData(data);
      let calendarColor = '#3f51b5';
      if (resourceData) {
        calendarColor = (resourceData.CalendarColor).toString();
      }
      return { background: calendarColor, color: '#FFFFFF' };
    }
  }

  public getHeaderTitle(data: Record<string, any>): string {
    return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
  }

  public getHeaderDetails(data: { [key: string]: Date }): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  public getEventType(data: { [key: string]: string }): string {
    const resourceData: Record<string, any> = this.getResourceData(data);
    let calendarText = '';
    if (resourceData) {
      calendarText = resourceData.CalendarText.toString();
    }
    return calendarText;
  }

  public buttonClickActions(e: Event): void {

    const quickPopup: HTMLElement = closest(e.target as HTMLElement, '.e-quick-popup-wrapper') as HTMLElement;
    const getSlotData: CallbackFunction = (): Record<string, any> => {
      let cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
      if (isNullOrUndefined(cellDetails)) {
        cellDetails = this.scheduleObj.getCellDetails(this.scheduleObj.activeCellsData.element);
      }
      const subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const notes = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
      const addObj: Record<string, any> = {};
      addObj.Id = this.scheduleObj.getEventMaxID();
      addObj.Subject = isNullOrUndefined(subject) ? 'Add title' : subject;
      addObj.StartTime = new Date(+cellDetails.startTime);
      addObj.EndTime = new Date(+cellDetails.endTime);
      addObj.IsAllDay = cellDetails.isAllDay;
      addObj.Description = isNullOrUndefined(notes) ? 'Add notes' : notes;
      addObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
      return addObj;
    };

    if ((e.target as HTMLElement).id === 'add') {
      const addObj: Record<string, any> = getSlotData();
      // console.log(getSlotData());
      // alert('sdf')
    // this.service.InsertCalendarEvents(addObj).subscribe(res=>{
      console.log(addObj)

    // })
     this.currentevents.push(addObj)

   // this.scheduleObj.addEvent()
      this.scheduleObj.addEvent(addObj);
      this.inc++

    } else if ((e.target as HTMLElement).id === 'delete') {
      const eventDetails: Record<string, any> = this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction;
      if (eventDetails.RecurrenceRule) {
        currentAction = 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
      const eventDetails: Record<string, any> = isCellPopup ? getSlotData() :
        this.scheduleObj.activeEventData.event as Record<string, any>;
      let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
      if (eventDetails.RecurrenceRule) {
        currentAction = 'EditOccurrence';
      }
      this.scheduleObj.openEditor(eventDetails, currentAction, true);
    }
    this.scheduleObj.closeQuickInfoPopup();
  }


  public onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    const targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, '.e-contextmenu')) {
      return;
    }
    this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (this.selectedTarget.classList.contains('e-appointment')) {
      const eventObj: Record<string, any> = this.scheduleObj.getEventDetails(this.selectedTarget) as Record<string, any>;
      if (eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj.showItems(['Save', 'Delete'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    }
    this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
  }

  public onMenuItemSelect(args: MenuEventArgs): void {
    const selectedMenuItem: string = args.item.id;
    let eventObj: { [key: string]: number };
    if (this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = this.scheduleObj.getEventDetails(this.selectedTarget) as { [key: string]: number };
    }

    switch (selectedMenuItem) {
      case 'Today':
        this.scheduleObj.selectedDate = new Date();
        break;
      case 'Add':
      case 'AddRecurrence':
        const selectedCells: Element[] = this.scheduleObj.getSelectedElements();
        const activeCellsData: CellClickEventArgs =
          this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
        if (selectedMenuItem === 'Add') {
          this.scheduleObj.openEditor(activeCellsData, 'Add');
        } else {
          this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
        }
        break;
      case 'Save':
      case 'EditOccurrence':
      case 'EditSeries':
        if (selectedMenuItem === 'EditSeries') {
          const query: Query = new Query().where(this.scheduleObj.eventFields.id, 'equal', eventObj.RecurrenceID);
          eventObj = new DataManager(this.scheduleObj.eventsData).executeLocal(query)[0] as { [key: string]: number };
        }
        this.scheduleObj.openEditor(eventObj, selectedMenuItem);
        break;
      case 'Delete':
        this.scheduleObj.deleteEvent(eventObj);
        break;
      case 'DeleteOccurrence':
      case 'DeleteSeries':
        this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
        break;
    }
  }

  public onPrintClick(): void {
    this.scheduleObj.print();
  }

  public onExportClick(args): void {
    if (args.item.text === 'Excel') {
      let exportDatas: Record<string, any>[] = [];
      const eventCollection: Record<string, any>[] = this.scheduleObj.getEvents();
      const resourceCollection: ResourcesModel[] = this.scheduleObj.getResourceCollections();
      const resourceData: Record<string, any>[] = resourceCollection[0].dataSource as Record<string, any>[];
      for (const resource of resourceData) {
        const data: Record<string, any>[] = eventCollection.filter((e: Record<string, any>) => e.CalendarId === resource.CalendarId);
        exportDatas = exportDatas.concat(data as Record<string, any>[]);
      }
      this.scheduleObj.exportToExcel({
        exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId']
      });
    } else {
      this.scheduleObj.exportToICalendar();
    }
  }



  customview(ev){

    this.show = !this.show
  }



}
function token(token: any) {
  throw new Error('Function not implemented.');
}

function detach(popupEle: HTMLElement) {
  throw new Error('Function not implemented.');
}

