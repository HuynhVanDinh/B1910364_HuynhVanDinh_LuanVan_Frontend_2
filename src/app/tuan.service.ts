import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TuanService {
  private baseUrl = 'http://localhost:9004/api/tuan';
  constructor(private http: HttpClient) {}
  getAllTuan(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getTuanCanBo(maCB: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/canbo/${maCB}`);
  }
  getTuanByTrangThai(trangThai: Number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${trangThai}`);
  }
  createTuan(
    batdau: Date,
    hethan: Date,
    soBuoi: number,
    macb: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      batdau: batdau,
      hethan: hethan,
      so_buoi: soBuoi,
    };
    return this.http.post<any>(url, body, {
      params: { macb: macb.toString() },
      headers: headers,
    });
  }
  editTuan(
    id: number,
    batdau: Date,
    hethan: Date,
    soBuoi: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/` + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      batdau: batdau,
      hethan: hethan,
      so_buoi: soBuoi,
    };
    return this.http.put<any>(url, body, {
      // params: { macb: macb.toString() },
      headers: headers,
    });
  }
}
