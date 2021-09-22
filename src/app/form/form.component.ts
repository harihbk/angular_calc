import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../formula/services/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
 
  fieldsss: FormlyFieldConfig[];
  data: ({ key: string; type: string; templateOptions: { required: boolean; type: string; label: string; placeholder?: undefined; description?: undefined; change?: undefined; options?: undefined; }; fieldGroup?: undefined; } | { key: string; templateOptions: { label: string; required?: undefined; type?: undefined; placeholder?: undefined; description?: undefined; change?: undefined; options?: undefined; }; fieldGroup: { key: string; type: string; templateOptions: { required: boolean; type: string; label: string; }; }[]; type?: undefined; } | { key: string; type: string; templateOptions: { label: string; placeholder: string; description: string; required: boolean; change: ($event: any) => void; options: ({ value: number; label: string; disabled?: undefined; } | { value: number; label: string; disabled: boolean; })[]; type?: undefined; }; fieldGroup?: undefined; })[];
  extra! :any;
  constructor(public common : CommonService) { }

  ngOnInit() {

     this.data =  [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          required: true,
          type: 'text',
          label: 'First Name',
        },
      },
      {
        key: 'address',
        templateOptions: { label: 'Address' },
        fieldGroup: [{
          key: 'town',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Address',
          },
        },
        {
          key: 'city',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'city',
          },
        }],
      },
      {
        key: 'Select',
        type: 'select',
        templateOptions: {
          label: 'Select',
          placeholder: 'Placeholder',
          description: 'Description',
          required: true,
          change: ($event:any) => { 
             this.onchange($event);
          },
          options: [
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2'  },
            { value: 3, label: 'Option 3'  },
            { value: 4, label: 'Option 4', disabled: true },
          ],
        },
      },
    ]
    
    this.fieldsss = this.data;
  }

    onchange(ev:any){
   
      this.extra =  {
        key: 'hari',
        type: 'input',
        templateOptions: {
          label: 'hari address',
          placeholder: 'hari email',
          required: true,
        }
      };
    

    //find index position
      let keys = ev.key;
      var index = this.fieldsss.findIndex(p => p.key == keys);
    //find index position
    

    
      var insert = function(arr:any, index:any, item:any) {
        return [
            ...arr.slice(0, index),     // first half
            item,                       // items to be inserted
            ...arr.slice(index)         // second half
        ];
    }

    
this.fieldsss = insert(this.fieldsss, index+1, this.extra);
console.log(this.fieldsss);
  }
  
  remove(){
    this.fieldsss = [
      ...this.fieldsss.filter(f => f.key !== 'days')
    ];
  }
  
  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }

}
