import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PieceMoveService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl+":"+environment.portNumber;
  getData(){
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl)
  }
  async startGame(){
    console.log(this.apiUrl);
    const response = await fetch(this.apiUrl+"/startGame",{
      method: 'POST'
    }).then((response) => response.text()).then((text)=>text);
    return JSON.parse(response)["data"]
  }

  getTheGame(){
    console.log(this.apiUrl)
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
