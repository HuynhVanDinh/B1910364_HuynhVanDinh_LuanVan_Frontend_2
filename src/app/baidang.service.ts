import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaidangService {
  private baseUrl = 'http://localhost:9004/api/baidang';

  constructor(private http: HttpClient) {}

  getAllBaiDang(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getBaiDangByDonVi(maDvtt: number): Observable<any> {
    const url = `${this.baseUrl}/donvi/${maDvtt}`;
    return this.http.get(url);
  }

  thembaidang(
    text: string,
    soluong: string,
    trocap: number | null,
    madv: string | null,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    if (!text || !soluong) {
      return throwError('Vui lòng nhập đầy đủ thông tin.');
    }

    const body = {
      noiDung: text,
      soLuong: soluong,
      troCap: trocap,
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.post(url, body, {
      params: { donViThucTapId: madv! },
      headers: headers,
    });
  }
  subaidang(
    id: number,
    text: string,
    soluong: string,
    trocap: number | null,
    madv: string | null,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    if (!text || !soluong) {
      return throwError('Vui lòng nhập đầy đủ thông tin.');
    }

    const body = {
      noiDung: text,
      soLuong: soluong,
      troCap: trocap,
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.put(url, body, {
      params: { donViThucTapId: madv! },
      headers: headers,
    });
  }
}
