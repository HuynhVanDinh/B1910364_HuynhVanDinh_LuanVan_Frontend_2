import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CanboService } from 'src/app/canbo.service';
import { CongviecService } from 'src/app/congviec.service';
import { DanhgiaService } from 'src/app/danhgia.service';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { RefreshService } from 'src/app/refresh-service.service';
import { DialogCongviecComponent } from '../dialog/dialog-congviec/dialog-congviec.component';
import { DialogDuyetcongviecComponent } from '../dialog/dialog-duyetcongviec/dialog-duyetcongviec.component';
import { DialogXoaDanhgiaComponent } from '../dialog/dialog-xoa-danhgia/dialog-xoa-danhgia.component';

@Component({
  selector: 'app-nhom-sinhvien',
  templateUrl: './nhom-sinhvien.component.html',
  styleUrls: ['./nhom-sinhvien.component.css'],
})
export class NhomSinhvienComponent implements OnInit {
  isLoading: boolean = false;
  myForm!: FormGroup;
  Mota!: string;
  @Input() sinhvien!: any;
  @Input() tuan!: any;
  isEdit: boolean = false;
  ListCongViec: any[] = [];
  ListDanhGia: any[] = [];
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
      this.getAllDanhGiaBySinhVienAndCanBoAndTuan();
    });
    // console.log(this.sinhvien);
    this.getAllCongViecBySinhVienAndCanBoAndTuan();
    this.getAllDanhGiaBySinhVienAndCanBoAndTuan();
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
    private refreshService: RefreshService,
    private danhGiaService: DanhgiaService,
    private toastr: ToastrService
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
  openDialogDuyet(data: any): void {
    this.dialog.open(DialogDuyetcongviecComponent, {
      width: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
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
            // console.log(data);
            this.ListCongViec = data;
            // console.log(this.ListCongViec);
          });
      });
    }
  }
  getAllDanhGiaBySinhVienAndCanBoAndTuan() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((dataCB) => {
        this.danhGiaService
          .getAllDanhGiaBySinhVienAndCanBoAndTuan(
            this.sinhvien.sinhVien.maSV,
            dataCB.maCB,
            this.tuan.id_tuan
          )
          .subscribe((data) => {
            // console.log(data);
            this.ListDanhGia = data;
            console.log('dg', this.ListDanhGia);
          });
      });
    }
  }
  danhgia(noidung: string) {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.danhGiaService
          .createDanhgia(
            noidung,
            this.tuan.id_tuan,
            this.sinhvien.sinhVien.maSV,
            data.maCB,
            authToken
          )
          .subscribe(
            () => {
              this.dialog.closeAll();
              this.isLoading = false;
              this.toastr.success('Thêm đánh giá thành công');
              console.log('Thêm đánh giá thành công');
              this.myForm.reset();
              this.myForm.markAsUntouched();
              this.myForm.markAsPristine();
              this.refreshService.triggerRefresh();
              // this.TuanComponent.getTuanCanBo();
            },
            (error: any) => {
              //  this.dialogRef.close('Closed using function');
              this.isLoading = false;
              this.toastr.error('Lỗi thêm đánh giá');
              console.error('Lỗi thêm đánh giá:', error);
            }
          );
      });
    }
    // console.log(noidung);
  }
  xoadanhgia(maDG: number) {
    this.dialog.open(DialogXoaDanhgiaComponent, {
      width: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        danhgia: maDG,
        CongViecComponent: this,
      },
      disableClose: true,
    });
  }
}
