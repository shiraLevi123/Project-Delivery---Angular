import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class DeliveryService {
    basicURL = 'https://localhost:7069/api/Deliveries';

    $source: Observable<number> = new Observable<number>((observer) => {
        observer.next(1);
        observer.complete();
        observer.error('error')
    })
    constructor(private _httpClient: HttpClient) { }

    getDelivery(): Observable<Delivery[]> {
        return this._httpClient.get<Delivery[]>(this.basicURL)
    }
    addDeliveryFormServer(d: Delivery): Observable<any> {
        var deliver: Delivery = {
            name: d.name,
            email: d.email,
            password: d.password,
            address: d.address,
            express: d.express,
            phone: d.phone,
            roles: d.roles
        };
        return this._httpClient.post<any>(this.basicURL, deliver);
    };

    deleteDelivery(id: number): Observable<any> {
        return this._httpClient.delete(`${this.basicURL}/${id}`);
    }
    getDeliveryByIdFormServer(id: number): Observable<Delivery> {
        return this._httpClient.get<Delivery>(`${this.basicURL}/${id}`);
    }
    updataDeliveryFromServer(d: Delivery): Observable<Delivery> {
        return this._httpClient.put<Delivery>(`${this.basicURL}/${d.id}`, d);
    }
   
TrackCalculationFromServer(origin: string, destination: string, waypoints: string[]): Observable<string[]> {
    let params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination);
  
    waypoints.forEach(waypoint => {
      params = params.append('waypoints', waypoint);
    });
    return this._httpClient.get<string[]>(`${this.basicURL}/optimized-route`, { params });
  }
    }