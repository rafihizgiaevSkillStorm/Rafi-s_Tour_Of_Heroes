import { Injectable } from '@angular/core';
import { fightMessage } from './fightMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  fightMessages: fightMessage[] = [];

  add(message: string){
    if(this.fightMessages.length)
    this.clearFights();
    this.messages.push(message);
  }
  addFight(fightMessage: fightMessage){
    this.fightMessages.push(fightMessage);
  }

  clear(){
    this.messages = [];
  }
  clearFights(){
    this.fightMessages = [];
  }



  constructor() { }
}
