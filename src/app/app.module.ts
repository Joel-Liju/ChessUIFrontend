import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChessboxComponent } from './chessbox/chessbox.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {url: 'http://192.168.0.50:5000',options:{}};
// import { SocketConnectionService } from './services/socket-connection.service';

@NgModule({
  declarations: [
    AppComponent,
    ChessboxComponent,
    ChessboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
