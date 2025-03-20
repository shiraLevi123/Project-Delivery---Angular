import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private webhookUrl = 'https://hook.eu2.make.com/e0looyzoex8ze6gcr9qaqh4ludgeagl5';

  constructor(private http: HttpClient) { }

  triggerWebhook(email: string, senderName: string) {
    return this.http.post(this.webhookUrl, JSON.stringify({
      email: email,
      senderName: senderName
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}