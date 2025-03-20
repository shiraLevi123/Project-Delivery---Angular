import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';


export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const isRequestAuthorized = authService.isAuthenticated && request.url.startsWith("https://localhost:7069/");
  const app= localStorage.getItem("app");
  if(app){
  const parsedData = JSON.parse(app);
  const { token } = parsedData;
  if (isRequestAuthorized) {    
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return next(clonedRequest);
  }
}

  return next(request);
};