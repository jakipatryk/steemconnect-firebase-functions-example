import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Message } from '../models/message';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Output() messageEmitter: EventEmitter<Message> = new EventEmitter<Message>();

  messageForm: FormGroup;

  minDueDate = new Date();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createMessageForm();
  }

  addMessage() {
    this.messageEmitter.emit({
      ...this.messageForm.value
    });
  }

  private createMessageForm() {
    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }
}
