import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  basicURL = 'https://localhost:7069/api/Orders';

  constructor(private _httpClient: HttpClient) { }
  
  private orderCountSubject = new BehaviorSubject<number>(0);
  orderCount$ = this.orderCountSubject.asObservable();

  updateOrderCount(count: number) {
    this.orderCountSubject.next(count);
  }
  getOrderFromServer(): Observable<Order[]> {
    return this._httpClient.get<Order[]>(this.basicURL)
  }
  updataOrderFromServer(order: Order): Observable<Order> {
    return this._httpClient.put<Order>(`${this.basicURL}/${order.id}`, order);

  }
  DeleteOrderFromServer(id:number):Observable<any>{
    return this._httpClient.delete(`${this.basicURL}/${id}`);
  }
  getActiveOrderCountFromServer(deliverId: string): Observable<number> {
    return this.getOrderFromServer().pipe(
      map((orders) => orders.filter(order => order.deliverId === deliverId && !order.status).length)
    );
  } 
  
}