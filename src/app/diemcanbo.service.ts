import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiemcanboService {
  private baseUrl = 'http://localhost:9004/api/diemcanbo';
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAllBySinhVien(maSV: number): Observable<any> {
    const url = `${this.baseUrl}/sinhvien/${maSV}`;
    return this.http.get(this.baseUrl);
  }
  createDiemCanBo(
    diem: Float32Array,
    maPhieu: number,
    sinhVienId: number,
    canBoId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      diemCB: diem,
    };
    return this.http.post(url, body, {
      params: {
        maPhieu: maPhieu,
        maSV: sinhVienId,
        maCB: canBoId,
      },
      headers: headers,
    });
  }
}
