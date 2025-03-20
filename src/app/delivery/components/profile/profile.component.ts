import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../../../services/delivery.service';
import { Delivery } from '../../../models/delivery.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  delivery: Delivery = {} as Delivery;


  constructor() { }
  ngOnInit() {
    const appData = localStorage.getItem('app'); 
    
    if (appData) {
      const parsedData = JSON.parse(appData);
      const { shortDelivery } = parsedData;
  
      if (shortDelivery) {
        this.delivery = shortDelivery; 
      }
    }
  }
  getName(): string {
    return this.delivery.name;
  }
  getEmail(): string {
    return this.delivery.email;
  }
  getAddress(): string {
    return this.delivery.address;
  }
  getRoles(): string {
    return this.delivery.roles;
  }
  getExpress(): boolean {
    return this.delivery.express;
  }
  getPhone(): string {
    return this.delivery.phone;
  }
}
