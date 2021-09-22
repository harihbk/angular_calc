import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { RouterModule } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { FormRoutes } from './form.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { PanelWrapperComponent } from './panel-wrapper.component';
const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormRoutes,
    ReactiveFormsModule,
     FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyBootstrapModule

    // FormlyModule.forRoot({
    //   validationMessages: [
    //     { name: 'required', message: 'This field is required' },
    //   ],
    //   wrappers: [
    //     { name: 'panel', component: PanelWrapperComponent },
    //   ],
    // }),
   
  ],
  declarations: [FormComponent , PanelWrapperComponent],
  // providers: [
  //   {
  //     provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  //     useValue: appearance
  //   }
  // ],
})
export class FormModule { }
