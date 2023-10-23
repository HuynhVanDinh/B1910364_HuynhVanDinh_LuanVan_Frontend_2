import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CanboService } from 'src/app/canbo.service';
import { CongviecService } from 'src/app/congviec.service';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { RefreshService } from 'src/app/refresh-service.service';
import { DialogCongviecComponent } from '../dialog/dialog-congviec/dialog-congviec.component';

@Component({
  selector: 'app-nhom-sinhvien',
  templateUrl: './nhom-sinhvien.component.html',
  styleUrls: ['./nhom-sinhvien.component.css'],
})
export class NhomSinhvienComponent implements OnInit {
  myForm!: FormGroup;
  Mota!: string;
  @Input() sinhvien!: any;
  @Input() tuan!: any;
  isEdit: boolean = false;
  ListCongViec: any[] = [];
  panelOpenState = false;
  displayedColumns: string[] = [
    'Mã công việc',
    'Mô tả công việc',
    'Tiến độ',
    'Trạng thái',
    'Thao tác',
  ];
  private subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.refreshService.refresh$.subscribe(() => {
      this.getAllCongViecBySinhVienAndCanBoAndTuan();
    });
    // console.log(this.sinhvien);
    this.getAllCongViecBySinhVienAndCanBoAndTuan();
    this.myForm = new FormGroup({
      Mota: new FormControl(),
    });
  }
  ngOnDestroy(): void {
    // Đảm bảo hủy đăng ký khi component bị hủy
    this.subscription.unsubscribe();
  }
  constructor(
    private dialog: MatDialog,
    private canboService: CanboService,
    private congViecService: CongviecService,
    private refreshService: RefreshService
  ) {}
  test(data: any) {
    console.log(data);
  }
  openDialogThem(): void {
    this.dialog.open(DialogCongviecComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        CongViecComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogSua(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogCongviecComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        congviec: data,
        CongViecComponent: this,
      },
      disableClose: true,
    });
    console.log(data);
  }
  getAllCongViecBySinhVienAndCanBoAndTuan() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((dataCB) => {
        this.congViecService
          .getAllCongViecBySinhVienAndCanBoAndTuan(
            this.sinhvien.sinhVien.maSV,
            dataCB.maCB,
            this.tuan.id_tuan
          )
          .subscribe((data) => {
            console.log(data);
            this.ListCongViec = data;
            console.log(this.ListCongViec);
            // console.log(
            //   'hahaha',
            //   this.sinhvien.sinhVien.maSV,
            //   dataCB.maCB,
            //   this.tuan.id_tuan
            // );
          });
      });
    }
  }
}
