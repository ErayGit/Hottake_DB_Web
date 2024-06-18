import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8020')
  }

  // Listen for events from the server
  onEvent(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });

      // Remove the event listener when the observable is unsubscribed
      return () => {
        this.socket.off(eventName);
      };
    });
  }

  // Emit events to the server
  emitEvent(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
