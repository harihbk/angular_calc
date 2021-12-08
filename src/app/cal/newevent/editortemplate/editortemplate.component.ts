import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EJ2Instance, PopupOpenEventArgs, RecurrenceEditor, RecurrenceEditorChangeEventArgs, timezoneData } from '@syncfusion/ej2-schedule';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-editortemplate',
  templateUrl: './editortemplate.component.html',
  styleUrls: ['./editortemplate.component.css']
})
export class EditortemplateComponent implements OnInit {

  @ViewChildren('startdate')
  public startdate!: QueryList<ElementRef<HTMLLIElement>>

  constructor() { }

  ngOnInit() {



  }

  ngAfterViewInit(): void {
    let startElement: HTMLInputElement =  document.querySelector('#StartTime') as HTMLInputElement;
    new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);

    let endElement: HTMLInputElement =  document.querySelector('#EndTime') as HTMLInputElement;
    new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);


 // All Day

 let allDayEle: HTMLInputElement = document.querySelector('#IsAllDay') as HTMLInputElement;
 console.log(allDayEle);

if (!allDayEle.classList.contains('e-checkbox')) {

 if ( allDayEle.classList.contains('e-header-cells') || allDayEle.classList.contains('e-all-day-cells') || allDayEle.classList.contains('e-all-day-appointment')) {
   new CheckBox({ checked: true, change: this.onCheck }, allDayEle);

 }
 else {

   new CheckBox({ checked: false, change: this.onCheck }, allDayEle);
 }
}

let timeZoneEle: HTMLInputElement = document.querySelector('#Timezone') as HTMLInputElement;


let booleanVal: boolean = false ? true : false;

if(!timeZoneEle.classList.contains('e-checkbox')) {
   new CheckBox({checked: booleanVal, change: this.onZoneChange}, timeZoneEle);
}

let startZoneEle: HTMLInputElement = document.querySelector('#StartTimezone') as HTMLInputElement;
let zoneVal: string = (<{ [key: string]: Object } & Window><unknown>window).Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC' : 'UTC';
let isAvaial: boolean = timezoneData.some((tz: { [key: string]: Object }) => { return tz.Value === zoneVal; });
zoneVal = isAvaial ? zoneVal : zoneVal;
if (!startZoneEle.classList.contains('e-dropdownlist')) {
 let dropDownListObject: DropDownList = new DropDownList({
   placeholder: 'Choose timezone', value: startZoneEle.value || zoneVal,
   dataSource: timezoneData, fields: { text: 'Text', value: 'Value' },
   filtering: (e: FilteringEventArgs) => {
         let query: Query = new Query();
         query = (e.text !== '') ? query.where('Text', 'contains', e.text, true) : query;
         e.updateData(timezoneData, query);
     }
 });
 dropDownListObject.appendTo(startZoneEle);
}

let endZoneEle: HTMLInputElement = document.querySelector('#EndTimezone') as HTMLInputElement;
if (!endZoneEle.classList.contains('e-dropdownlist')) {
 let dropDownListObject: DropDownList = new DropDownList({
   placeholder: 'Choose timezone', value: endZoneEle.value || zoneVal,
   dataSource: timezoneData, fields: { text: 'Text', value: 'Value' },
   filtering: (e: FilteringEventArgs) => {
         let query: Query = new Query();
         query = (e.text !== '') ? query.where('Text', 'contains', e.text, true) : query;
         e.updateData(timezoneData, query);
     }
 });
 dropDownListObject.appendTo(endZoneEle);
}


if (allDayEle.checked === true) {
 document.querySelector('#TimezoneRow').classList.add('e-disable');
 document.querySelector('#startZoneRow').classList.add('e-disable');
 document.querySelector('#endZoneRow').classList.add('e-disable');
 document.querySelectorAll('.e-time-icon')[1].classList.add('e-icon-disable');
 document.querySelectorAll('.e-time-icon')[0].classList.add('e-icon-disable');
 (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/d/yy";
 (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/d/yy";
 (document.querySelector('#StartTime') as any).ej2_instances[0].value.setHours(0, 0, 0);
 (document.querySelector('#EndTime') as any).ej2_instances[0].value.setDate((document.querySelector('#StartTime') as any).ej2_instances[0].value.getDate() + 1);
 (document.querySelector('#EndTime') as any).ej2_instances[0].value.setHours(0, 0, 0);
 (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();
} else {
   document.querySelector('#TimezoneRow').classList.remove('e-disable');


   if((document.querySelector('#Timezone') as HTMLInputElement).checked) {
     document.querySelector('#startZoneRow').classList.remove('e-disable');
   document.querySelector('#endZoneRow').classList.remove('e-disable');
   } else {
      document.querySelector('#startZoneRow').classList.add('e-disable');
      document.querySelector('#endZoneRow').classList.add('e-disable');
   }


 document.querySelectorAll('.e-time-icon')[1].classList.remove('e-icon-disable');
 document.querySelectorAll('.e-time-icon')[0].classList.remove('e-icon-disable');
 (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/d/yy h:mm a";
 (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/d/yy h:mm a";
 // (document.querySelector('#StartTime') as any).ej2_instances[0].value.setHours(9, 0, 0);
 // (document.querySelector('#EndTime') as any).ej2_instances[0].value.setHours(9, 30, 0);
 (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();
}



// (<any>this.scheduleObj.eventWindow).recurrenceEditor.endType.index =  0;
// (<any>this.scheduleObj.eventWindow).recurrenceEditor.endType.dataSource = [
//   {
//       "text": "Until",
//       "value": "until"
//   },
//   {
//       "text": "Count",
//       "value": "count"
//   }
// ]





  }

  public customfields = [
    {name : 'Quantity' , label : 'Quantity'},
    {name : 'Product' , label : 'Product'},
    {name : 'Windows' , label : 'Windows'},
    {name : 'Order' , label : 'Order'},
    {name : 'Quantity' , label : 'Quantity'},
   ];



  public onCheck(args: any): void {

    let zoneRow: HTMLTableRowElement = document.querySelector('#TimezoneRow');
        let startZone: HTMLTableRowElement = document.querySelector('#startZoneRow');
          let endZone: HTMLTableRowElement = document.querySelector('#endZoneRow');
          if (args.checked === true) {
            zoneRow.classList.add('e-disable');
            startZone.classList.add('e-disable');
            endZone.classList.add('e-disable');
        document.querySelectorAll('.e-time-icon')[1].classList.add('e-icon-disable');
        document.querySelectorAll('.e-time-icon')[0].classList.add('e-icon-disable');
        (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/d/yy";
        (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/d/yy";
        (document.querySelector('#StartTime') as any).ej2_instances[0].value.setHours(0, 0, 0);
        (document.querySelector('#EndTime') as any).ej2_instances[0].value.setDate((document.querySelector('#StartTime') as any).ej2_instances[0].value.getDate() + 1);
        (document.querySelector('#EndTime') as any).ej2_instances[0].value.setHours(0, 0, 0);
        (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();
      } else {
        if(zoneRow.classList.contains('e-disable')) {
          zoneRow.classList.remove('e-disable');

          if((document.querySelector('#Timezone') as HTMLInputElement).checked) {
            startZone.classList.remove('e-disable');
            endZone.classList.remove('e-disable');
          }
        }
        document.querySelectorAll('.e-time-icon')[1].classList.remove('e-icon-disable');
        document.querySelectorAll('.e-time-icon')[0].classList.remove('e-icon-disable');
        (document.querySelector('#StartTime') as any).ej2_instances[0].format = "M/d/yy h:mm a";
        (document.querySelector('#EndTime') as any).ej2_instances[0].format = "M/d/yy h:mm a";

        (document.querySelector('#StartTime') as any).ej2_instances[0].dataBind();
      }
  }
  public onZoneChange(args: any): void {
    let startZone: HTMLTableRowElement = document.querySelector('#startZoneRow');
    let endZone: HTMLTableRowElement = document.querySelector('#endZoneRow');

    if(args.checked === true) {
      startZone.classList.remove('e-disable');
      endZone.classList.remove('e-disable');
    } else {
      startZone.classList.add('e-disable');
      endZone.classList.add('e-disable');
    }

  }




  onChange(args: RecurrenceEditorChangeEventArgs): void {
    if (!isNullOrUndefined(args.value)) {
        let outputElement: HTMLElement = <HTMLElement>document.querySelector('#rule-output');
        if(args.value == "") {
            outputElement.innerText = 'Select Rule';
        } else {
            outputElement.innerText = args.value;
        }


        let recurrence: RecurrenceEditor = (document.querySelector(
          ".e-recurrenceeditor"
        ) as EJ2Instance).ej2_instances[0] as RecurrenceEditor;
        recurrence.change = function(args) {
           console.log(args);

        }



    }
      }

}
