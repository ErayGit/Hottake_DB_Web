import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  constructor() {
    const userJSON = localStorage.getItem("user");
    if(userJSON) {
      const parsedUser = JSON.parse(userJSON || "{}");
      const user = new User(parsedUser);
      const userId = user.id!;
      this.socket = io('http://localhost:8020', {
        query: {
          userId: userId,
        }
      })
    } else {
      this.socket = io('http://localhost:8020', {})
    }
  }

  onEvent(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }

  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
