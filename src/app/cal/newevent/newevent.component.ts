import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';
import {MatDialog} from '@angular/material/dialog';
import { EditortemplateComponent } from './editortemplate/editortemplate.component';


@Component({
  selector: 'app-newevent',
  templateUrl: './newevent.component.html',
  styleUrls: ['./newevent.component.css']
})
export class NeweventComponent implements OnInit {


  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }



valueChanged(){



  }

  public openDialog() {

    const dialogRef = this.dialog.open(

      EditortemplateComponent,
      {
        height: '100%',
        width: '100%'
    }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


    // let outputElement: HTMLElement = document.querySelector('#rule-output') as HTMLElement;
    // if (!isNullOrUndefined(args.value)) {
    //     outputElement.innerText = args.value;
    // }
//}

}
