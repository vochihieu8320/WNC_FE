import { Injectable } from '@angular/core';
import {Data} from "../data/data"

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private data: Data) {}


  getDatas(){
    return this.data.User()
  }
  createData(data : any[], value : any)
  {
    data.push(value);
  }
  deleteDatas(data: any[], index: number)
  {
    data.splice(index, 1);    
  }
  Details(data : any[], index: number)
  {
    return data[index]
  }
  update(data : any[], index : number, value: any)
  {
    data[index] = value;
  }

}
