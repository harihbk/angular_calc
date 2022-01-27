import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { each } from 'jquery';
import { MailService } from './mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  profileForm : FormGroup
  submitted = false;
  datas: Object;
  constructor(
    private formBuilder: FormBuilder,
    private service     : MailService
    ) {


    }

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

  async ngOnInit() {
   this.profileForm = this.validation

   async function* streamAsyncIterable(stream) {


    return this.service.getuser(stream.id)
  }


  //   this.service.getusers().subscribe(async (res:any)=>{

  //     (async function() {
  //       for await (let num of  streamAsyncIterable(res)) {
  //         console.log(num);

  //       }
  //    })();
  //   //   res.map( async elm=>{
  //   //     console.log(elm.id);
  //   //     (await this.service.getuser(elm.id)).subscribe(res=>{
  //   //      console.log(res);

  //   //    })
  //   //  })
  // })
   //console.log(users);
  }

   async getuserb(id){
    return  await this.service.getuser(id)
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

  checkmail(){
    let data = {username:'hari95nn@outlook.com'}
    this.service.postmethod("testmail",data).subscribe(res=>{
      console.log(res);
      },err=>{
        console.log(err);

      })
  }

  GetImap(){
    let data = {username:'hari95nn@outlook.com'}
    this.service.postmethod("GetImap",data).subscribe(res=>{
      console.log(res);
      },err=>{
        console.log(err);
      })
  }


}
