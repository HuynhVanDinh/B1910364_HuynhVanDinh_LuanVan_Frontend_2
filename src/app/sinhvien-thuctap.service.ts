import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KetQua } from './model/ketqua.model';

@Injectable({
  providedIn: 'root',
})
export class SinhvienThuctapService {
  private baseUrl = 'http://localhost:9004/api/ketquathuctap';
  constructor(private http: HttpClient) {}
  getAllKetQuaThucTap(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllKetQuaThucTapDonVi(madvtt: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/madvtt/${madvtt}`);
  }
  getKetQuaThucTapChuaPhanCong(madvtt: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chuaphancong/${madvtt}`);
  }
  getAllKetQuaCanBo(macb: number, trangThai: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/macb/${macb}/${trangThai}`);
  }
  getAllKetQuaCanbo(macb: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/macb/${macb}`);
  }
  changeCanBo(maKqtt: KetQua, macb: number): Observable<any> {
    const url = `${this.baseUrl}/thaydoi/${macb}`;
    return this.http.put(url, maKqtt);
  }
  updateMultipleKetQuaThucTap(
    makqtt: KetQua[],
    maCb: number
  ): Observable<any[]> {
    return this.http.put<any[]>(
      `${this.baseUrl}/update-multiple?maCb=${maCb}`,
      makqtt
    );
  }
  updateTrangThaiDangKy(
    maKqtt: number,
    maCB: number,
    trangThai: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/thaydoitrangthai`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      maKqtt: maKqtt,
      canbo: maCB,
      trangThai: trangThai,
    };
    return this.http.put<any>(url, body, { headers: headers });
  }
}
