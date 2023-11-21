import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanboService } from 'src/app/canbo.service';
import { CongviecService } from 'src/app/congviec.service';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';
import { DialogCongviecComponent } from '../dialog/dialog-congviec/dialog-congviec.component';

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
    private congViecService: CongviecService,
    private dialog: MatDialog,
    private sinhvienThuctapService: SinhvienThuctapService,
    private canboService: CanboService
  ) {}
  getSinhVienCanBo() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.sinhvienThuctapService
          .getAllKetQuaCanBo(data.maCB,0)
          .subscribe((dataSV) => {
            console.log('fdsgsgaf', dataSV);
            this.sinhVienList = dataSV;

          });
      });
    }
  }
  getAllCongViec() {
    this.congViecService.getAllCongViec().subscribe((data) => {
      console.log('công việc nè:', data);
    });
  }

}
