import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MailService } from './mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  profileForm : FormGroup
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private service     : MailService
    ) { }

  get validation(){
    return this.formBuilder.group({
      driver   :[''],
      hostname: ['', Validators.required],
      port: ['', Validators.required ],
      encryption: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
   this.profileForm = this.validation
  }

  get f() { return this.profileForm.controls; }

  submit(){
    this.submitted = true;
    this.profileForm.markAsTouched();
    if (this.profileForm.invalid) {
      return;
  }
  let data = this.profileForm.value;
  this.service.postmethod("mailsetup",data).subscribe(res=>{
  console.log(res);
  },err=>{
    console.log(err);

  })

    console.log(this.profileForm.value);

  }
}
