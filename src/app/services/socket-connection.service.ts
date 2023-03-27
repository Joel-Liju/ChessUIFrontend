import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

const backendUrl = "ws://127.0.0.1:5000/gameconnect";
@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {
  // private subject: AnonymousSubject<MessageEvent>;
  // public data: Subject<string>;

  constructor(private socket: Socket){
    
  }
  public setUpConnection(){
    return this.socket.fromEvent('move');
    // this.socket.emit('connect',"hi there");
  }
  public sendData(data:string){
    this.socket.emit('makeAMove', data);
  }

  public getMoved(){
    return this.socket.fromEvent('move');
  }

}
