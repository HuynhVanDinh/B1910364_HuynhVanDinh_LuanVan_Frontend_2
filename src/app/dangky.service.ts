import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DangkyService {
  private baseUrl = 'http://localhost:9004/api/dangky';
  constructor(private http: HttpClient) {}
  getAllDangky(maDvtt: number): Observable<any> {
    const url = `${this.baseUrl}/${maDvtt}/dangky`;
    return this.http.get(url);
  }
  updateTrangThaiDangKy(maDK: number, trangThai: number, authToken: string): Observable<any> {
    const url = `${this.baseUrl}/${maDK}/capnhattrangthai?trangThaiMoi=${trangThai}`;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${authToken}`,
        });
    // const body = { trangThai: trangThai }; // Data to be sent in the request body
    return this.http.put(url, {
      headers: headers,
    });
  }
}
