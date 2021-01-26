import { RxStompService } from '@stomp/ng2-stompjs';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;

  constructor(
    private rxStompService: RxStompService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.rxStompService.watch('/jre/socket-publisher/message-channel').subscribe((message) => {
      console.log(message.body);
      this.message = message.body;
    })
  }
  
  sendMessage() {
    this.rxStompService.publish({
      destination: '/jre/socket-subscriber/send/message', 
      body: 'test'
    });
  }

}
