import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  profileForm : FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  get validation(){
    return this.formBuilder.group({
      hostname: ['', Validators.required],
      port: ['', [Validators.required , Validators.pattern('/^(?:587|465)$/gm')]],
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
    console.log(this.profileForm.value);

  }
}
