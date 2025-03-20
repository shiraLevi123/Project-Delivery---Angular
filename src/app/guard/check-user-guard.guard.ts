import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const checkUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 

  if (typeof localStorage !== 'undefined') {
    if (!localStorage.getItem('app')) {
      Swal.fire({
        title: "אינך מחובר",
        icon: "error",
        confirmButtonColor: "#778da9",
        cancelButtonColor: "#d33",
        showCancelButton: true, 
        confirmButtonText: "התחברות",
        cancelButtonText: "ביטול",
        showCloseButton: true, 
      }).then((result) => {
        if (result.isConfirmed) {
          router.navigate(['/login-delivery']);
        }
      });
      return false; 
    }
  }
  
  return true; 
};
