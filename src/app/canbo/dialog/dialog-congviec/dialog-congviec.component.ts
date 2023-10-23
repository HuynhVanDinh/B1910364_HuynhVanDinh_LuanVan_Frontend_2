import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CanboService } from 'src/app/canbo.service';
import { CongviecService } from 'src/app/congviec.service';
import { RefreshService } from 'src/app/refresh-service.service';

@Component({
  selector: 'app-dialog-congviec',
  templateUrl: './dialog-congviec.component.html',
  styleUrls: ['./dialog-congviec.component.css'],
})
export class DialogCongviecComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  Mota!: string;
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    //  console.log('Mota congviec', this.data);
    this.myForm = new FormGroup({
      Mota: new FormControl(),
    });

    if (this.data.isEdit) {
      // console.log('Mota congviec', this.data);
      this.isEditMode = true;
      this.id = this.data.congviec.maCV;
      this.Mota = this.data.congviec.mota;
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    private congViecService: CongviecService,
    // private khoaService: KhoaService,
    private canboService: CanboService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    // private tuanService: TuanService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCongviecComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.congviec.maCV;
      this.Mota = this.data.congviec.mota;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  CongViecComponent = this.data.CongViecComponent;

  themCongViec(Mota: string): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // console.log("hihi",this.CongViecComponent);
    const maSV = this.CongViecComponent.sinhvien.sinhVien.maSV;
    const tuan = this.CongViecComponent.tuan.id_tuan;
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    // console.log(thoiGianBatDau,thoiGianKetThuc)

    this.isLoading = true;
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.congViecService
          .createCongViec(Mota, tuan, maSV, data.maCB, authToken)
          .subscribe(
            () => {
              this.dialog.closeAll();
              this.isLoading = false;
              this.toastr.success('Thêm công việc thành công');
              console.log('Thêm công việc thành công');
              this.refreshService.triggerRefresh();
              // this.TuanComponent.getTuanCanBo();
            },
            (error: any) => {
              this.dialogRef.close('Closed using function');
              this.isLoading = false;
              this.toastr.error('Lỗi thêm công việc');
              console.error('Lỗi thêm công việc:', error);
            }
          );
      });
    }
  }
  suaCongViec(id: number, Mota: string): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    const accountid = localStorage.getItem('accountid');
    const maSV = this.CongViecComponent.sinhvien.sinhVien.maSV;
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.congViecService
          .editCongViec(id, Mota, maSV, data.maCB, authToken)
          .subscribe(
            (data) => {
              console.log(data);
              this.dialog.closeAll();
              this.isLoading = false;
              this.toastr.success('Sửa công việc thành công');
              console.log('Sửa công việc thành công');
              this.refreshService.triggerRefresh();
              // this.TuanComponent.getTuanCanBo();
            },
            (error: any) => {
              this.dialogRef.close('Closed using function');
              this.isLoading = false;
              this.toastr.error('Lỗi sửa công việc');
              console.error('Lỗi sữa công việc:', error);
            }
          );
      });
    }
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
