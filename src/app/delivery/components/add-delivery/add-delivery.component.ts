import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryService } from '../../../services/delivery.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';

interface PlaceSuggestion {
  description: string;
  placeId: string;
}

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.css'
})
export class AddDeliveryComponent implements OnInit {
  public addForm!: FormGroup;
  private apiKey = 'AIzaSyD1tOgpBuB9IkiXq3oMlro3eUwPGi7E2-k';
  public suggestions: PlaceSuggestion[] = [];
  public loading = false;

  constructor(private _deliveryService: DeliveryService, private _router: Router, private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', Validators.required),
      express: new FormControl(false, Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      roles: new FormControl('', Validators.required),
    });

    this.addForm.get('address')?.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => {
        if (value && value.length > 2) {
          this.loading = true;
          return this.getAddressSuggestions(value).pipe(
            catchError(error => {
              console.error('Error fetching suggestions:', error);
              return of({ suggestions: [] });
            })
          );
        } else {
          this.suggestions = [];
          return of({ suggestions: [] });
        }
      })
    ).subscribe(response => {
      this.loading = false;
      if (response && response.suggestions) {
        this.suggestions = response.suggestions.map((suggestion: any) => {
          return {
            description: suggestion.placePrediction.text.text,
            placeId: suggestion.placePrediction.placeId
          };
        });
      } else {
        this.suggestions = [];
      }
    });
  }

  selectAddress(suggestion: PlaceSuggestion): void {
    this.addForm.get('address')?.setValue(suggestion.description);
    this.suggestions = [];
  }

  getAddressSuggestions(input: string): Observable<any> {
    const url = 'https://places.googleapis.com/v1/places:autocomplete';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.apiKey,
      'X-Goog-FieldMask': 'suggestions.placePrediction.text,suggestions.placePrediction.placeId'
    });

    const body = {
      input: input,
      locationBias: {
        rectangle: {
          low: {
            latitude: 29.0,
            longitude: 34.0
          },
          high: {
            latitude: 34.0,
            longitude: 36.0
          }
        }
      },
      languageCode: 'he'
    };

    return this.http.post<any>(url, body, { headers });
  }

  addDelivery() {
    if (this.addForm.valid) {
      this._deliveryService.addDeliveryFormServer(this.addForm.value).subscribe({
        next: (res) => {
          this._router.navigate([''])
        },
        error: (err) => {
          console.error('error:', err);
        }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}