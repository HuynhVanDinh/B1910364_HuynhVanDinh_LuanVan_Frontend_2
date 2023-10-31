import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DanhgiaService {
  private baseUrl = 'http://localhost:9004/api/danhgia';
  constructor(private http: HttpClient) {}
  getAllDanhGia(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }
  getAllDanhGiaBySinhVienAndCanBoAndTuan(
    sinhvienId: number,
    canboId: number,
    id_tuan: number
  ): Observable<any> {
    const url = `${this.baseUrl}/${sinhvienId}/${canboId}/${id_tuan}`;
    return this.http.get(url);
  }
  createDanhgia(
    noidung: string,
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
      noiDungDG: noidung,
    };
    return this.http.post(url, body, {
      params: {
        tuan: id_tuan,
        sinhVien: sinhVienId,
        canBo: canBoId,
      },
      headers: headers,
    });
  }
  deleteDanhGia(maDG: number, authToken: string): Observable<any> {
    const url = `${this.baseUrl}/${maDG}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.delete(url,{
      headers: headers,
    });
  }
}
