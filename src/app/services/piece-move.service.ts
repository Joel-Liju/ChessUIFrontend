import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceMoveService {

  constructor(private http: HttpClient) { }
  apiUrl = "http://192.168.0.50:5000"
  getData(){
    
    return this.http.get(this.apiUrl)
  }
  async startGame(){
    // console.log("hi")
    // const response = await this.http.post(this.apiUrl+"/startGame", "");
    const response = await fetch(this.apiUrl+"/startGame",{
      method: 'POST'
    }).then((response) => response.text()).then((text)=>text);
    return JSON.parse(response)["data"]
  }

  getTheGame(){
    return this.http.get(this.apiUrl+"/getTheGame");
    // return JSON.stringify(response)
  }

  async makeAMove(moved:string){
    // console.log(moved);
    const response = await fetch(this.apiUrl+"/makemove",{
      method: 'POST',
      body: JSON.stringify({
        move:moved
      }),
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => response.text()).then((text)=> text);
    // console.log(response)
    return JSON.parse(response)["data"];
  }
}
