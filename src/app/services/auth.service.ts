import { AuthAdapter } from "./adapters";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map, tap, throwError, catchError } from "rxjs";
import { LocalManagerService, LocalKeys } from "./local-manager.service";
import { AuthData,LoginResponse } from "../models/auth.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:4000/auth';
  http = inject(HttpClient);
  localManager = inject(LocalManagerService);

  login(user: AuthData): Observable<String> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user)
    .pipe(
      map(AuthAdapter));
  }
}