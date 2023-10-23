import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CongviecService {
  private baseUrl = 'http://localhost:9004/api/congviec';
  constructor(private http: HttpClient) {}
  getAllCongViec(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }
  getAllCongViecBySinhVienAndCanBoAndTuan(
    sinhvienId: number,
    canboId: number,
    id_tuan: number
  ): Observable<any> {
    const url = `${this.baseUrl}/${sinhvienId}/${canboId}/${id_tuan}`;
    return this.http.get(url);
  }
  createCongViec(
    Mota: string,
    id_tuan: number,
    sinhVienId: number,
    canBoId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      mota: Mota,
    };
    return this.http.post(url, body, {
      params: {
        id_tuan: id_tuan,
        sinhVienId: sinhVienId,
        canBoId: canBoId,
      },
      headers: headers,
    });
  }
  editCongViec(
    id: number,
    Mota: string,
    sinhVienId: number,
    canBoId: number,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}/`+id;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      mota: Mota,
    };
    return this.http.put(url, body, {
      params: {
        sinhVienId: sinhVienId,
        canBoId: canBoId,
      },
      headers: headers,
    });
  }
}
