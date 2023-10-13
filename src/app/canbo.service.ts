import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanboService {
  private baseUrl = 'http://localhost:9004/api/canbo';
  constructor(private http: HttpClient) {}
  getCanBoByDonViThucTap(dvttid: number): Observable<any> {
    const url = `${this.baseUrl}/listcanbo/${dvttid}`;
    return this.http.get(url);
  }
  createCanBo(
    tenCB: string,
    gioiTinh: string,
    hinhAnh: string,
    ngSinh: Date,
    sdt: string,
    donViThucTapId: number,
    username: string,
    password: string,
    email: string,
    authToken: string
  ): Observable<any> {
    const url = `${this.baseUrl}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    const body = {
      tenCB: tenCB,
      gioiTinh: gioiTinh,
      hinhAnh: hinhAnh,
      ngSinh: ngSinh,
      sdtCB: sdt,
    };

    return this.http.post(url, body, {
      params: {
        donViThucTapId: donViThucTapId,
        username: username,
        password: password,
        email: email,
      },
      headers: headers,
    });
  }
}
