import { Component, Input, OnInit } from '@angular/core';
import { SinhVien } from 'src/app/model/sinhvien.model';

@Component({
  selector: 'app-nhom-sinhvien',
  templateUrl: './nhom-sinhvien.component.html',
  styleUrls: ['./nhom-sinhvien.component.css'],
})
export class NhomSinhvienComponent implements OnInit {
  @Input() sinhvien!: any;
  ngOnInit(): void {
      console.log(this.sinhvien);
  }

}
