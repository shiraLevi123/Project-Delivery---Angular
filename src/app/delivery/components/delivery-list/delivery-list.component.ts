import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../models/delivery.model';
import { DeliveryService } from '../../../services/delivery.service';
import { Router } from '@angular/router';
import { EmailService } from '../../../services/email.service';

@Component({

  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent implements OnInit {

  delivery: Delivery[] = [];
  showUpdateForm: boolean = false;
  showExpressOnly = false;
  isAdmin: boolean = false;

  ngOnInit() {
    this.getDelivery();
    this.checkAdminRole();
  }
  constructor(private _router: Router, private _deliveryService: DeliveryService, private emailService: EmailService) { }

  getDelivery() {
    this._deliveryService.getDelivery().subscribe({

      next: (data) => {
        this.delivery = data;
      },
      error: (err) => {
        console.error("Error fetching deliveries:", err);
      }
    });
  }
  checkAdminRole() {
    const appData = localStorage.getItem('app');
    if (appData) {
      const { shortDelivery } = JSON.parse(appData);
      if (shortDelivery) {
        this.isAdmin = shortDelivery.roles === 'manager';
      }
    }
  }

  deleteDelivery(index: number) {
    const deliveryItem = this.delivery[index];

    if (!deliveryItem || deliveryItem.id === undefined) {
      console.error("Error: Invalid delivery ID");
      return;
    }

    this._deliveryService.deleteDelivery(deliveryItem.id).subscribe({
      next: () => {
        this.getDelivery();
      },
      error: (err) => {
        console.error("Error deleting delivery:", err);
      }
    });
  }
  navigateToUpdate(delivery: number) {
    this._router.navigate(['/update-delivery', delivery]);
  }

  sendEmail(email: string, senderName: string) {
    this.emailService.triggerWebhook(email, senderName).subscribe({
      next: () => console.log(`✅ Webhook activated for ${email}, email is being sent to ${senderName}!`),
    });
  }
}
