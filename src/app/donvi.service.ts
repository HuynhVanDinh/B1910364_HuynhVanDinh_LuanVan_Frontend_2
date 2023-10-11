import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonviService {
  private baseUrl = 'http://localhost:9004/api/donvithuctap';
  constructor(private http: HttpClient) {}
  getAllDonvi(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getDonvi(accountid: string | null): Observable<any> {
    const url = `${this.baseUrl}/account/${accountid}`;
    console.log(url);
    return this.http.get(url);
  }
}
