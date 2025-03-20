import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Delivery } from '../models/delivery.model';
import { ShortDelivery } from '../models/shortDelivery.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpClient: HttpClient) { }

  isAuthenticated$ = new BehaviorSubject<boolean>(!!localStorage.getItem('app'));

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }
  login(delivery: Delivery): Observable<{ token: string; deliveryId: number; shortDelivery: ShortDelivery }> {
    return this._httpClient.post<{ token: string; deliveryId: number; shortDelivery: ShortDelivery }>(
      'https://localhost:7069/api/Auth', delivery
    ).pipe(
      tap((res) => {
        localStorage.setItem('app', JSON.stringify({
          deliveryId: res.deliveryId,
          token: res.token,
          shortDelivery: res.shortDelivery
        }));
        this.isAuthenticated$.next(true);
      })
    );
  }
}