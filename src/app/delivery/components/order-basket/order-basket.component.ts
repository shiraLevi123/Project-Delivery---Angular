import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';
import { DeliveryService } from '../../../services/delivery.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-order-basket',
  templateUrl: './order-basket.component.html',
  styleUrl: './order-basket.component.css'
})
export class OrderBasketComponent implements OnInit {
  orders: Order[] = [];
  deliveryId: string | null = null;
  showToastMessage = false;
  toastMessage = '';
  toastTimer: any = null;
  orderCount: number = 0;

  constructor(private _orderService: OrderService, private _deliveryService: DeliveryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const appData = localStorage.getItem('app');
    if (appData) {
      const { deliveryId } = JSON.parse(appData);
      this.deliveryId = deliveryId;
      this.getDeliveryOrders();
    }
  }

  showToast(message: string) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastMessage = message;
    this.showToastMessage = true;

    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast() {
    this.showToastMessage = false;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
  }
  getDeliveryOrders() {
    this._orderService.getOrderFromServer().subscribe({
      next: (data) => {
        this.orders = data.filter(order => order.deliverId === this.deliveryId);
        this.orderCount = this.orders.filter(order => !order.status).length;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('שגיאה בטעינת ההזמנות:', err);
      }
    });
  }
  DidIt(order: Order) {
    order.status = true;
    this._orderService.updataOrderFromServer(order).subscribe({
      next: () => {
        this.showToast('ההזמנה נשלחה אל המנהל, תודה על הביצוע');
        this.getDeliveryOrders();
      },
      error: (err) => {
        console.error('שגיאה בעדכון ההזמנה:', err);
        this.showToast('אירעה שגיאה בעדכון ההזמנה');
      }
    });
  }
  TrackCalculation() {
    const appData = localStorage.getItem('app');
    if (appData) {
      const { shortDelivery } = JSON.parse(appData);

      const completedOrders = this.orders.filter(order => order.status);

      let origin;
      if (completedOrders.length > 0) {

        const lastCompletedOrder = completedOrders[completedOrders.length - 1];
        origin = `${lastCompletedOrder.address} ${lastCompletedOrder.numHouse}, ${lastCompletedOrder.city}`;
      } else {
        origin = shortDelivery.address;
      }
      const destination = shortDelivery.address;

      const waypoints = this.orders
        .filter(order => !order.status)
        .map(order => `${order.address} ${order.numHouse}, ${order.city}`);

      if (waypoints.length === 0) {
        console.error('❌ אין נקודות עצירה');
        return;
      }

      this._deliveryService.TrackCalculationFromServer(origin, destination, waypoints).subscribe({
        next: (sortedAddresses) => {
          console.log('🚀 המסלול הקצר ביותר:', sortedAddresses);
          this.orders = sortedAddresses.map(address =>
            this.orders.find(order => `${order.address} ${order.numHouse}, ${order.city}` === address)
          ).filter(order => order !== undefined) as Order[];
        },
        error: (err) => {
          console.error('❌ שגיאה בחישוב המסלול:', err);
        }
      });
    }
  }

}  