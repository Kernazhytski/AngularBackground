import * as cluster from "cluster";

export class Probe{
  public id:number;
  public name:string;
  public location:string;
  public type:string;
  public description:string;
  public model:string;
  public unit:string;
  public range_from:number;
  public range_to:number;

  constructor(id:number,
              name:string,
              location:string,
              type:string,
              description:string,
              model:string,
              unit:string,
              range_from:number,
              range_to:number) {
    this.id=id;
    this.description=description;
    this.location=location;
    this.model=model;
    this.type=type;
    this.name=name;
    this.unit=unit;
    this.range_from=range_from;
    this.range_to=range_to;
  }
}
