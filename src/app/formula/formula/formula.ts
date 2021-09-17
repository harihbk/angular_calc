export class Formula {
  public _formula ?:String;
  public _values ?:String
  constructor(formula:string,values:string){
  this._formula = formula
  this._values = values
  }
}
