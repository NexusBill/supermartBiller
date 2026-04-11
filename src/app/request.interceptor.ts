import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
///const toastr = inject(ToastrService);
export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  const clientCode = localStorage.getItem('clientCode');
  console.log('Client Code from localStorage:', clientCode);
debugger
  if (clientCode) {
   
debugger
      const toastr = ToastrService;
      const updatedUrl = 'http://localhost:3000/api/'+clientCode+ req.url

    const clonedReq = req.clone({
      url: updatedUrl
    });

   // return next(clonedReq);
      return next(clonedReq).pipe(
    catchError((error) => {

      console.error('API Error:', error);

      // 🔥 Show toaster
     // toastr.error('Something went wrong!', 'Error');

      return throwError(() => error);
  }));
  }

  return next(req);
};