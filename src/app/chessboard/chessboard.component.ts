import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PieceMoveService } from '../services/piece-move.service';
import { SocketConnectionService } from '../services/socket-connection.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})

export class ChessboardComponent implements OnInit{
  IsWhiteTurn: boolean = true
  chessboard: chessbox = []
  folderChess: string = "primary"
  pieceSelected: boolean = false//indicates if a piece has been selected
  selectedPos: number = -1 // the position of the selected piece
  imagePath(path: string, folder:string = this.folderChess): string{
    //capital is white and small is black
      switch(path){
        case 'p':
          return "/assets/"+folder+"/blackpawn.png";
        case 'P':
          return "/assets/"+folder+"/whitepawn.png";
        case 'r':
          return "/assets/"+folder+"/blackrook.png";
        case "R":
          return "/assets/"+folder+"/whiterook.png"; 
        case "n":
          return "/assets/"+folder+"/blackknight.png";
        case "N":
          return "/assets/"+folder+"/whiteknight.png";
        case "b":
          return "/assets/"+folder+"/blackbishop.png";
        case "B":
          return "/assets/"+folder+"/whitebishop.png";
        case "k":
          return "/assets/"+folder+"/blackking.png";
        case "q":
          return "/assets/"+folder+"/blackqueen.png";
        case "Q":
          return "/assets/"+folder+"/whitequeen.png";
        case "K":
          return "/assets/"+folder+"/whiteking.png";
        default:
            return ""
      }
  }
  readData(data:string):string{
    var temp = data.split(" ")
    var boardStringRep = temp[0].split("/")
    this.IsWhiteTurn = temp[1]=='w';
    var board = ""

    for(var i = 0; i<8;i++){
      for(var j = 0; j<boardStringRep[i].length;j++){
        var num = parseInt(boardStringRep[i][j]);
        if(!isNaN(num)){
          for(var t = 0;t<num;t++){
            board = board + ".";
          } 
        }
        else 
          board = board + boardStringRep[i][j];
      }
    }
    // console.log(board)
    return board;
  }
  movePiece(idx:number):void{
      if(!this.pieceSelected){
        //check to see if there is a piece to select.
        if(this.chessboard[idx].pieceRep!='.' && (this.IsWhiteTurn == (this.chessboard[idx].pieceRep.toUpperCase()===this.chessboard[idx].pieceRep))) {
          this.pieceSelected = true;
          this.selectedPos = idx;
          var div = document.getElementById("chessbox"+idx);
          if(div)
            div.style.backgroundColor = 'lightblue';
        }
        //if there is a piece, then select it and then update the flag
      }
      else{
        //a piece has been selected
        // if(this.chessboard[idx].pieceRep=='.'){
          // console.log(this.chessboard[idx])
          // console.log(this.chessboard[this.selectedPos])
          this.socketService.sendData(this.chessboard[this.selectedPos].squareName+this.chessboard[idx].squareName);
          // .then(data=>{
          //   // console.log(this.readData(data));
          //     var tempdata = this.readData(data);
          //     this
          //     
              
          //   }
          //   
            // this.socketService.sendData("done with it")
          // })

          
          
        // }
      }
  }

  async startNewGame(){
    var response = await this.apiService.startGame();
    this.updateBoard(response);
    // console.log("hi")
  }
  updateBoard(data:string){
    var tempdata = this.readData(data);
    console.log(data)
    for(var i = 0;i<64;i++){
            // if((i%2==0 && Math.floor(i/8)%2==0) || ( i%2==1 && Math.floor(i/8)%2==1))
              this.chessboard[i].piece = this.imagePath(tempdata[i]);
              this.chessboard[i].pieceRep = tempdata[i];
              var div = document.getElementById("chessbox"+this.selectedPos);
              if(div)
                div.style.backgroundColor = this.chessboard[this.selectedPos].color;
              // = {color:"darkgoldenrod",piece:this.imagePath(startPos[i]), pieceRep:startPos[i], squareName:fileNames[i%8]+String(8-Math.floor(i/8))}
            // else
            //   this.chessboard[i] = {color:"beige",piece:this.imagePath(startPos[i]), pieceRep:startPos[i], squareName:fileNames[i%8]+String(8-Math.floor(i/8))}
          // var temp = this.chessboard[this.selectedPos].pieceRep;
          // this.chessboard[this.selectedPos].pieceRep = '.';
          // this.chessboard[this.selectedPos].piece = this.imagePath('.');
    }
    this.pieceSelected = false;
    this.selectedPos = -1;
          // this.chessboard[idx].pieceRep = temp;
          // this.chessboard[idx].piece = this.imagePath(temp);
  }
  
  
  constructor(private apiService:PieceMoveService, private socketService:SocketConnectionService){}
  ngOnInit(): void {
    // var tempPos = "";
    

    this.apiService.getTheGame().subscribe((data) => {
      var temp = JSON.parse(JSON.stringify(data));
      var startPos = this.readData(temp["data"]);
      var fileNames = ['a','b','c','d','e','f','g','h']
    for(var i = 0;i<64;i++){
      if((i%2==0 && Math.floor(i/8)%2==0) || ( i%2==1 && Math.floor(i/8)%2==1))
        this.chessboard[i] = {color:"darkgoldenrod",piece:this.imagePath(startPos[i]), pieceRep:startPos[i], squareName:fileNames[i%8]+String(8-Math.floor(i/8))}
      else
        this.chessboard[i] = {color:"beige",piece:this.imagePath(startPos[i]), pieceRep:startPos[i], squareName:fileNames[i%8]+String(8-Math.floor(i/8))}
    }
    });

    // this.apiService.startGame();

    this.socketService.getMoved().subscribe((data:any)=> {
      this.updateBoard(JSON.parse(JSON.stringify(data))["data"]);
    });
  }
}
type chessbox = Array<{color: string; piece: string, pieceRep:string, squareName:string}>;