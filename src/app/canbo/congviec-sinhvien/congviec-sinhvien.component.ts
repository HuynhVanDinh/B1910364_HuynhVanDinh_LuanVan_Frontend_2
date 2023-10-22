import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';

@Component({
  selector: 'app-congviec-sinhvien',
  templateUrl: './congviec-sinhvien.component.html',
  styleUrls: ['./congviec-sinhvien.component.css'],
})
export class CongviecSinhvienComponent implements OnInit {
  @Input() tuan!: any;
  sinhVienList: SinhVien[] = [];
  ngOnInit(): void {
    this.getSinhVienCanBo();
  }
  constructor(
    private dialog: MatDialog,
    private sinhvienThuctapService: SinhvienThuctapService
  ) {}
  getSinhVienCanBo() {
    this.sinhvienThuctapService.getAllKetQuaCanBo(12).subscribe((data) => {
      console.log('fdsgsgaf', data);
      this.sinhVienList = data;
    });
  }
}
