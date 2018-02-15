import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  currentUser;
  messages: Observable<Message[]>;

  constructor(
    private messageService: MessageService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.currentUser = user;
    });
    this.messages = this.messageService.getMessages();
  }

  addMessage(data) {
    const dataWithAuthor = { ...data, author: this.currentUser.uid };
    this.messageService.addMessage(dataWithAuthor);
  }
}
