import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
//  template: '<canvas #canvas></canvas>',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit  {
  @ViewChild('canvas') public canvas: ElementRef;
   params:any;
   form = new FormGroup({});

  constructor(
    private _httpClient : HttpClient,
    private fb : FormBuilder
  ) { }

  get panel(){
    let panels = (this.form.get('panels') as FormGroup)
    panels.addControl("Panel1",this.fb.group({

      width : [],
      height:[]
     }))


    return  panels
  }

 get items(){
   return this.fb.group({
     itemname : [''],
     quantity : [''],
     height : [''],
     width : [''],

   })
 }

  ngOnInit() {
    this.form = this.fb.group({
      cut_width : ['',],
      min_initial_usage : [true],
      panels    : this.fb.group({}),
      items     : this.fb.array([this.items])
    });
    this.panel

    console.log(this.form.get('items'));

  }

  additems(){
   (this.form.get('items') as FormArray).push(this.items);
  }

  removeitem(i){
    (this.form.get('items') as FormArray).removeAt(i)
  }


  async onClickSubmit(){

    let data = this.form.value.items
     let obj = {};
     let _obj = {};
    for( let key in data ) {

      var qty = data[key].quantity
      var height = data[key].height
      var width = data[key].width
      var itemname =  data[key].itemname
      for(var i = 1 ;i<=qty; i++){
          let innerobj = {};
          innerobj['width'] =  Number(width);
          innerobj['height'] =  Number(height);
          innerobj['can_rotate'] = Boolean(1)
          _obj[`${itemname} ${i}`] = innerobj;
      }

    }
     let formdata = this.form.value
     delete formdata['items'];
     formdata['items'] = _obj
     formdata['cut_width'] = Number(formdata['cut_width'])
     formdata['panels']['Panel1'] = { width : Number(formdata['panels']['Panel1']['width']) , height :  Number(formdata['panels']['Panel1']['height']) }

  console.log(formdata);

  let data_data =  formdata
this.apical(data_data)


  }

  apical(data_data){
    console.log(data_data);

    data_data = JSON.stringify(data_data)

    let _data = new Promise((resolve,reject)=>{
      this._httpClient
      .post("https://opcut.herokuapp.com/calculate?method=forward_greedy&native=false",data_data,{}).subscribe((res:any)=>{
        resolve(res)
      },err=>{
        reject(err)
      })
    })
     _data.then((obj:any)=>{
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');
      let used = obj.used;
      let items = obj.params.items;
      for (let key in used){
        let item = used[key].item;
        let _width = items[item].width;
        let _height = items[item].height;

        let obj2 = {
          'width' : _width,
          'height': _height
        }
        used[key]['xx'] = Number(used[key].x.toFixed(2));
        used[key]['yy'] = Number(used[key].y.toFixed(2));
        used[key]['width']=obj2.width;
        used[key]['height']=obj2.height;
        used[key]['width1']=obj2.width;
        used[key]['height1']=obj2.height;

      }

         let _w = obj.params.panels.Panel1.width;
         let _h = obj.params.panels.Panel1.height;
         var _panelwidth =  500 / _w;
         var _panelheight =  500 / _h;


          for (let key in used){

          var x = used[key].xx * _panelwidth
          var y = used[key].yy * _panelheight
          var text = used[key].item
          var width,height;


          if(used[key].rotate){
            height = used[key]['width'] * _panelwidth
            width = used[key]['height'] * _panelheight

          }else {
            width = used[key]['width'] * _panelwidth
            height = used[key]['height'] * _panelheight

          }

        this.cx.fillStyle = "white";
        this.cx.textAlign="center";
        // this.cx.lineWidth = 2;

        this.cx.fillStyle = "black";
        this.cx.rect(x, y, width, height);
        this.cx.fill()
    }



    for (let key in used){
          var x = used[key].xx * _panelwidth
          var y = used[key].yy * _panelheight
          var text = used[key].item
          var width,height;
          if(used[key].rotate){
            height = used[key]['width'] * _panelwidth
            width = used[key]['height'] * _panelheight
          }else {
            width = used[key]['width'] * _panelwidth
            height = used[key]['height'] * _panelheight
          }
        this.cx.font="10px Georgia";
        this.cx.fillStyle = "red";
        var rectHeight = height;
        var rectWidth = width;
        let rectX = x;
        let rectY =y;
        this.cx.fillText(text,rectX+(rectWidth/2),rectY+(rectHeight/2));

    }







    }).catch(err=>{
      console.log(err);

    })
  }

  private cx: CanvasRenderingContext2D;

  public used :  {
    "panel": any,
    "item": any,
    "x": any,
    "y": any,
    "xx":any,
    "yy":any,
    "rotate": false
}

generatecanvas(){

}

  async ngAfterViewInit() {

  //   const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
  //   this.cx = canvasEl.getContext('2d');

  //      let data = '{"cut_width":0.3,"min_initial_usage":true,"panels":{"Panel1":{"width":100,"height":100}},"items":{"Item1 1":{"width":20,"height":10,"can_rotate":true},"Item1 2":{"width":20,"height":10,"can_rotate":true},"Item1 3":{"width":20,"height":10,"can_rotate":true},"Item1 4":{"width":20,"height":10,"can_rotate":true},"Item1 5":{"width":20,"height":10,"can_rotate":true},"Item2 1":{"width":10,"height":30,"can_rotate":true},"Item2 2":{"width":10,"height":30,"can_rotate":true},"Item2 3":{"width":10,"height":30,"can_rotate":true},"Item3 1":{"width":20,"height":10,"can_rotate":true},"Item3 2":{"width":20,"height":10,"can_rotate":true},"Item4 1":{"width":10,"height":40,"can_rotate":true},"Item4 2":{"width":10,"height":40,"can_rotate":true}}}';

  //     let _data = new Promise((resolve,reject)=>{
  //       this._httpClient
  //       .post("https://opcut.herokuapp.com/calculate?method=forward_greedy&native=false",data,{}).subscribe((res:any)=>{
  //         resolve(res)
  //       },err=>{
  //         reject(err)
  //       })
  //     })

  //     await _data.then((obj:any)=>{
  //             let used = obj.used;
  //             let items = obj.params.items;
  //             for (let key in used){
  //               let item = used[key].item;
  //               let _width = items[item].width;
  //               let _height = items[item].height;

  //               let obj2 = {
  //                 'width' : _width,
  //                 'height': _height
  //               }
  //               used[key]['xx'] = Number(used[key].x.toFixed(2));
  //               used[key]['yy'] = Number(used[key].y.toFixed(2));
  //               used[key]['width']=obj2.width;
  //               used[key]['height']=obj2.height;
  //               used[key]['width1']=obj2.width;
  //               used[key]['height1']=obj2.height;

  //             }

  //                let _w = obj.params.panels.Panel1.width;
  //                let _h = obj.params.panels.Panel1.height;
  //                var _panelwidth =  500 / _w;
  //                var _panelheight =  500 / _h;


  //                 for (let key in used){

  //                 var x = used[key].xx * _panelwidth
  //                 var y = used[key].yy * _panelheight
  //                 var text = used[key].item
  //                 var width,height;


  //                 if(used[key].rotate){
  //                   height = used[key]['width'] * _panelwidth
  //                   width = used[key]['height'] * _panelheight

  //                 }else {
  //                   width = used[key]['width'] * _panelwidth
  //                   height = used[key]['height'] * _panelheight

  //                 }

  //               this.cx.fillStyle = "white";
  //               this.cx.textAlign="center";
  //               // this.cx.lineWidth = 2;

  //               this.cx.fillStyle = "black";
  //               this.cx.rect(x, y, width, height);
  //               this.cx.fill()
  //           }



  //           for (let key in used){
  //                 var x = used[key].xx * _panelwidth
  //                 var y = used[key].yy * _panelheight
  //                 var text = used[key].item
  //                 var width,height;
  //                 if(used[key].rotate){
  //                   height = used[key]['width'] * _panelwidth
  //                   width = used[key]['height'] * _panelheight
  //                 }else {
  //                   width = used[key]['width'] * _panelwidth
  //                   height = used[key]['height'] * _panelheight
  //                 }
  //               this.cx.font="10px Georgia";
  //               this.cx.fillStyle = "red";
  //               var rectHeight = height;
  //               var rectWidth = width;
  //               let rectX = x;
  //               let rectY =y;
  //               this.cx.fillText(text,rectX+(rectWidth/2),rectY+(rectHeight/2));

  //           }



  //            // this.cx.fill()

  //     }).catch(err=>{
  //       console.log(err);

  //     })




  //    function random_rgba() {
  //     var o = Math.round, r = Math.random, s = 255;
  //     return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  // }


}


}
