import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as d3 from 'd3'
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
//  template: '<canvas #canvas></canvas>',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit  {
  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('render') public render: ElementRef;
  @ViewChild('svgContainer', {read: ElementRef, static: true}) svgContainerRef!: ElementRef<HTMLDivElement>;


   params:any;
   form = new FormGroup({});
   cx:any
   svg: any;

  constructor(
    private _httpClient : HttpClient,
    private fb : FormBuilder
  ) {




   }

  get panel(){

    let panels = (this.form.get('panels') as FormGroup)
    panels.addControl("Panel1",this.fb.group({

      width : [100],
      height:[100]
     }))


    return  panels
  }

 get items(){
   return this.fb.group({
     itemname : ['item1'],
     quantity : ['2'],
     height : ['49'],
     width : ['49'],

   })
 }

  ngOnInit() {
    this.form = this.fb.group({
      cut_width : [0.3],
      min_initial_usage : [true],
      panels    : this.fb.group({}),
      items     : this.fb.array([this.items])
    });
    this.panel

    console.log(this.form.get('items'));



    this.svg = d3.select(this.svgContainerRef.nativeElement)
    .append("svg").classed('testclass', true).
    attr("width", 600).
    attr("height", 600)
    .style("border", "1px solid black");


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

      this.svg.selectAll(".rect").remove()

      // const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      // this.cx = canvasEl.getContext('2d');



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
         var _panelwidth =  600 / _w;
         var _panelheight =  600 / _h;


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

        var rectHeight = height;
        var rectWidth = width;
        let rectX = x;
        let rectY =y;


          this.svg.append("rect")
          .attr("x", x)
          .attr("y", y)
          .attr("class","rect")
          .attr("height", height)
          .attr("width", width)
          .transition().duration(5000).ease(d3.easeLinear).style("opacity", 1)
          .style("fill", '#000');

          // this.svg.append("image")
          // .attr("xlink:href", "assets/fabric.jpeg")
          // .attr("class","rect")
          // .attr('x', x)
          // .attr('y', y)
          // .attr('width', height)
          // .attr('height', width);


          this.svg.append("text")
          .attr("class","rect")
          .style("fill", 'red')
          .attr("x", rectX+(rectWidth/2)/2)
          .attr("y", rectY+(rectHeight/2))
          .attr("dy", ".35em")
          .style("font-size", function(d) {
            return `${parseInt(rectWidth+rectHeight/ 60)}%`

          }).style("text-align","center")
          .text(text);

    }



    }).catch(err=>{
      console.log(err);

    })
  }


 clearcanvas(){


  // this.cx.fillStyle = "red";
  // this.cx.clearRect(0,0,this.cx.width,this.cx.height)
  // this.cx.width  = 600;
  // this.cx.height = 600;
 }


  async ngAfterViewInit() {

}


}
