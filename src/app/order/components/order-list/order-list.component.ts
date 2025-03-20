import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  selectedArea: string = '';
  uniqueAreas: string[] = [];
  searchText: string = '';
  filteredOrders: Order[] = [];
  isAdmin: boolean = false;
  viewMode: string = 'toDo';
  isLogIn: boolean = false;


  ngOnInit() {
    this.getOrder();
    this.getFilteredOrders();
    this.checkAdminRole();
    this.viewMode = this.isAdmin ? 'toDo' : 'toDo';
  }
  constructor(private _orderService: OrderService, private cdr: ChangeDetectorRef) { }


  checkAdminRole() {
    const appData = localStorage.getItem('app');
    if (appData) {
      const { shortDelivery } = JSON.parse(appData);
      if (shortDelivery) {
        this.isAdmin = shortDelivery.roles === 'manager';

      }
    }
  }
 
  getOrder() {
    this._orderService.getOrderFromServer().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
        this.uniqueAreas = [...new Set(this.orders.map(order => order.city))];
        this.cdr.detectChanges();
            },
      error: (err) => {
        console.log(err);
      }
    });
  }
  deleteOrder(id: number) {
    this._orderService.DeleteOrderFromServer(id).subscribe({
      next: () => {
        this.getOrder();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getFilteredOrders() {
    let filteredOrders = this.orders;

    if (this.selectedArea) {
      filteredOrders = filteredOrders.filter(order => order.city === this.selectedArea);
    }
    this.filteredOrders = filteredOrders;
  }
  addToBasket(order: Order) {
    const appData = localStorage.getItem('app');
    if (!appData) return;

    const { deliveryId } = JSON.parse(appData);
    if (!deliveryId) return;

    order.deliverId = deliveryId;
    order.status = false;

    this._orderService.updataOrderFromServer(order).subscribe(() => {
    });
  }



}