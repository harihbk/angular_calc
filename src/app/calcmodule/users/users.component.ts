import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { CalendarService } from '../services/calendar.service';
import { Internationalization } from '@syncfusion/ej2-base';

import {
  WeekService, WorkWeekService, MonthService, EventSettingsModel, GroupModel, RenderCellEventArgs, ResourceDetails, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import * as $ from 'jquery';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() users: any ;

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;


  defaulttime: any;
  slot: number;
  dynamicDate: any = [];
  items: any = [];


  public showHeaderBar: Boolean = false;
  public selectedDate: Date = new Date(2018, 3, 1);
    public views: Array<string> = ['Week', 'WorkWeek', 'Month'];
    public currentView: string = 'WorkWeek';
    public eventSettings: EventSettingsModel = {
        dataSource: []
    };
    public group: GroupModel = {
        resources: ['Conferences']
    };
    public allowMultipleCategory: Boolean = true;
    public conferenceDataSource: Object[] = [
        { text: 'Will Smith', id: 1, color: '#ea7a57' ,designation: "Cardioligst" },
        { text: 'Alice', id: 2, color: 'rgb(53, 124, 210)',designation: "Cardioligst" },
        { text: 'Robson', id: 3, color: '#7fa900' ,designation: "Cardioligst"}
    ];

    public instance: Internationalization = new Internationalization();
  df: number;
  @ViewChild('table') table: ElementRef;
  constructor(
    public service : CalendarService,
    private renderer: Renderer2
  ) {}

   getDateHeaderText: Function = (value: Date) => {

    return this.instance.formatDate(value, { skeleton: 'Ed' });
};

onRenderCell(args: RenderCellEventArgs): void {
//  if (args.element.classList.contains('e-work-cells')) {
    // let resource: ResourceDetails = this.scheduleObj.getResourcesByIndex(args.groupIndex);
     let ind = args.groupIndex;
    // args.element.innerHTML = "hari"


    if (args.element.classList.contains('e-header-cells')) {
     var index = $(args.element).attr("data-group-index")



    var ul=args.element.getElementsByTagName("div")[0]; // the [0] identifies the first element of the returned array
    var li=document.createElement("div");
    li.innerHTML=this.conferenceDataSource[index].text;
    args.element.appendChild(li)
  console.log(ul.parentNode.firstChild);
  ul.before(li,ul.parentNode.firstChild)


    }


     const p: HTMLParagraphElement = this.renderer.createElement('p');
     p.innerHTML = "add new"
    // this.renderer.appendChild(this.div.nativeElement, p)
 // }
}

   getWeather: Function = (value: Date) => {
    switch (value.getDay()) {
        case 0:
            return '<div class="weather-text">25°C</div>';
        case 1:

            return '<div class="weather-text">18°C</div>';
        case 2:
            return '<div class="weather-text">10°C</div>';
        case 3:
            return '<div class="weather-text">16°C</div>';
        case 4:
            return '<div class="weather-text">8°C</div>';
        case 5:
            return '<div class="weather-text">27°C</div>';
        case 6:
            return '<div class="weather-text">17°C</div>';
        default:
            return null;
    }
}


  ngOnInit() {

    this.service.schedularobj.subscribe((res:any)=>{

    this.timescale(res)
    })

  //   //default timezone
  //   console.log(this.schedular);
  //   var x = {
  //     nextSlot: 30,
  //     startTime: '1:00',
  //     endTime: '23:00'
  // };



  // for (let hour = 0; hour < 24; hour++) {
  //   this.items.push(moment({ hour }).format('h:mm A'))
  //   this.items.push(moment({ hour, minute: 30 }).format('h:mm A'))
  // }





  //   let currentViewDates: Date[] = this.schedular.getCurrentViewDates() as Date[];
  //   let startDate: Date = currentViewDates[0] as Date;
  //   let endDate: Date = currentViewDates[currentViewDates.length - 1] as Date;

  //   let diff = this.calculateDiff(startDate,endDate)
  //   var sd:any = startDate



  }

  timescale(res){

    let currentViewDates: Date[] = res.getCurrentViewDates() as Date[];
    let startDate: Date = currentViewDates[0] as Date;
    let endDate: Date = currentViewDates[currentViewDates.length - 1] as Date;

   for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
      this.dynamicDate.push({
         'date': m.format('YYYY-MM-DD')
      })
  }

    let starthour =res.startHour;
    let endhour =res.endHour;
    let timeformat = res.timeFormat ? res.timeFormat : 'hh:mm a' ;
    let slotcount =res.timeScale.slotCount;
    let interval= res.timeScale.interval
    let Settimeformat = res.timeFormat ? 24 : 12 ;


    let shours = moment(starthour,"HH:mm").format("H")
    let ehours = moment(endhour,"HH:mm").format("H")

    console.log([starthour,endhour,timeformat,slotcount,interval,Settimeformat]);
    console.log([shours,ehours]);




    for (var hour:any = shours; hour < ehours ; hour++) {
    this.items.push(moment({ hour }).format(timeformat))
  //  this.items.push(moment({ hour, minute: 30 }).format(timeformat))
  }
  console.log(this.items);


  }

  calculateDiff(startDate,endDate){
    let d2:any  = new Date(endDate);
    let d1:any  =new Date(startDate); //time in milliseconds
    var diffDays:any = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays);
}

}
