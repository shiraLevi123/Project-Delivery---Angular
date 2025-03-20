import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Delivery } from '../../../models/delivery.model';
import { DeliveryService } from '../../../services/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.css']
})
export class UpdateDeliveryComponent implements OnInit {
  delivery: Delivery = new Delivery();
  @Output() cancel = new EventEmitter<void>();
  public updateForm!: FormGroup;

  constructor(private _deliveryService: DeliveryService, private route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._deliveryService.getDeliveryByIdFormServer(Number(id)).subscribe({
        next: (data) => {
          this.delivery = data;
          this.initForm(); // אתחול הטופס רק אחרי קבלת המידע
        },
        error: (err) => {
          console.error('Error loading delivery:', err);
        }
      });
    }
  }

  private initForm() {
    this.updateForm = new FormGroup({

      name: new FormControl(this.delivery?.name || '', Validators.required),
      email: new FormControl(this.delivery?.email || '', [Validators.required, Validators.email]),
      password: new FormControl(this.delivery?.password || '', [Validators.required, Validators.minLength(8)]),
      address: new FormControl(this.delivery?.address || '', Validators.required),
      express: new FormControl(this.delivery?.express || false, Validators.required),
      phone: new FormControl(this.delivery?.phone || '', [Validators.required, Validators.pattern('[0-9]+')]),
      roles: new FormControl(this.delivery?.roles || '', Validators.required)
    });
  }

  updateDelivery() {
    if (this.updateForm.valid) {
      const updatedDelivery: Delivery = {
        ...this.delivery,
        ...this.updateForm.value
      };

      this._deliveryService.updataDeliveryFromServer(updatedDelivery).subscribe({
        next: (res) => {
          this.router.navigate(['/delivery-list']);
        },
        error: (err) => {
          console.error("שגיאה בעדכון:", err);
        }
      });
    }
  }
  cencel() {
    this.router.navigate(['/delivery-list'])
  }
}