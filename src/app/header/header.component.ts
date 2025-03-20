import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  orderCount: number = 0;
  isSidebarOpen: boolean = false;
  deliveryId: string | null = null;
  isAdmin: boolean = false;
  isLogIn: boolean = false;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef, private _router: Router,) { }


  ngOnInit() {
    this.getDeliveryId()
    this.orderService.orderCount$.subscribe((count) => {
      this.orderCount = count;
      if (this.deliveryId) {
        this.getActiveOrderCount();
      }
    });
    this.checkAdminRole();
  }
  checkAdminRole() {
    const appData = localStorage.getItem('app');
    if (appData) {
      const { shortDelivery } = JSON.parse(appData);
      if (shortDelivery) {
        this.isAdmin = shortDelivery.roles === 'manager';
      }
    }
    this.cdr.detectChanges();
  }

  getDeliveryId() {
    const appData = localStorage.getItem("app");
    if (appData) {
      const { deliveryId } = JSON.parse(appData);
      this.deliveryId = deliveryId;
    }
  }
  getActiveOrderCount() {
    if (this.deliveryId) {
      this.orderService.getActiveOrderCountFromServer(this.deliveryId).subscribe({
        next: (count) => {
          this.orderCount = count;
          this.orderService.updateOrderCount(this.orderCount); // עדכון השירות
        },
        error: (err) => {
          console.error('שגיאה בקבלת מספר ההזמנות:', err);
        },
      });
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }
  logout() {
    localStorage.removeItem("app") 
    this._router.navigate(['']);
  }

  nav() {
    this._router.navigate([''])
  }
  
}
