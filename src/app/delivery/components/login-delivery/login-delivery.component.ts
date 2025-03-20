import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-delivery',
  templateUrl: './login-delivery.component.html',
  styleUrl: './login-delivery.component.css'
})
export class LoginDeliveryComponent implements OnInit {
  public loginForm!: FormGroup;
  public isModalVisible: boolean = false;
  public isFormCompleted: boolean = false;
  public canCloseModal: boolean = false;
  public loginError: string | null = null;
  errorMessage: string = '';

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }
  login() {
    const loginData = this.loginForm.value;
    this._authService.login(loginData).subscribe({
      next: (res) => {
        localStorage.setItem('app', JSON.stringify({
          deliveryId: res.deliveryId,
          token: res.token,
          shortDelivery: res.shortDelivery,

        }));
        this._authService.isAuthenticated$.next(true);
        this._router.navigate(['']);
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = "שם משתמש או סיסמא שגויים";
      }
    });
  }
}
