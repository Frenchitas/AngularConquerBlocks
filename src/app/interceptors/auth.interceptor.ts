import { LocalManagerService, AuthService, LocalKeys } from "../services";
import { isPlatformServer } from "@angular/common";
import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localManager = inject(LocalManagerService);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) { return next(req) }

  const token = localManager.getElement(LocalKeys.accessToken);

  let headers = req.headers.set('Content-Type', 'application/json');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq);
};