import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()

export class HttpErrorInterceptors  implements HttpInterceptor {
  constructor(public router: Router) {
}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
        } else {
          switch (error.status) {
            case 401:
              localStorage.removeItem('auth_app_token');
              localStorage.removeItem('user');
              localStorage.removeItem('permissions');
              this.router.navigateByUrl("/auth").then(() => null);
              break;
              case 403:
                this.router.navigateByUrl("/unautorized").then(() => null);
              break;
          }
        }
      } else {
      }
      return throwError(error);
    }),
  );
}
}
