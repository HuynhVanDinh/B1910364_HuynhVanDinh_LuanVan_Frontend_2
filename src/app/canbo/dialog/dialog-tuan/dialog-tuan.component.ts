import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CanboService } from 'src/app/canbo.service';
import { TuanService } from 'src/app/tuan.service';

@Component({
  selector: 'app-dialog-tuan',
  templateUrl: './dialog-tuan.component.html',
  styleUrls: ['./dialog-tuan.component.css'],
})
export class DialogTuanComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  tenDot!: string;
  soBuoi!: number;
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;
  danhSachBuoi: any[] = [
    {
      buoiId: 6,
      tenbuoi: '6 buổi',
    },
    {
      buoiId: 7,
      tenbuoi: '7 buổi',
    },
    {
      buoiId: 8,
      tenbuoi: '8 buổi',
    },
    {
      buoiId: 9,
      tenbuoi: '9 buổi',
    },
    {
      buoiId: 10,
      tenbuoi: '10 buổi',
    },
    {
      buoiId: 11,
      tenbuoi: '11 buổi',
    },
    {
      buoiId: 12,
      tenbuoi: '12 buổi',
    },
  ];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      tenDot: new FormControl(),
      soBuoi: new FormControl(),
      thoiGianBatDau: new FormControl(),
      thoiGianKetThuc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log('hùdhfhj', this.data);
      this.isEditMode = true;
      this.id = this.data.tuan.id_tuan;
      this.thoiGianBatDau = this.data.tuan.batdau;
      this.thoiGianKetThuc = this.data.tuan.hethan;
       this.soBuoi = this.data.tuan.so_buoi;
       this.myForm.get('soBuoi')?.setValue(this.data.tuan.so_buoi);
    } else {
      this.isEditMode = false;
    }
  }

  constructor(
    // private khoaService: KhoaService,
    private canboService: CanboService,
    private toastr: ToastrService,
    private tuanService: TuanService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogTuanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.tuan.id_tuan;
      this.thoiGianBatDau = this.data.tuan.batdau;
      this.thoiGianKetThuc = this.data.tuan.hethan;
      this.soBuoi = this.data.tuan.so_buoi;
      this.myForm.get('soBuoi')?.setValue(this.data.tuan.so_buoi);
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  TuanComponent = this.data.TuanComponent;

  themTuan(thoiGianBatDau: Date, thoiGianKetThuc: Date, soBuoi: number): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
     const soBuoiValue = this.myForm.get('soBuoi')!.value;
     soBuoi = soBuoiValue;
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
        this.tuanService
          .createTuan(thoiGianBatDau, thoiGianKetThuc, soBuoi, data.maCB, authToken)
          .subscribe(
            () => {
              this.dialog.closeAll();
              this.isLoading = false;
              this.toastr.success('Thêm tuần thành công');
              console.log('Thêm tuần thành công');
              this.TuanComponent.getTuanCanBo();
            },
            (error: any) => {
              this.dialogRef.close('Closed using function');
              this.isLoading = false;
              this.toastr.error('Lỗi thêm tuần');
              console.error('Lỗi thêm tuần:', error);
            }
          );
      });
    }
  }
  suaTuan(id: number, thoiGianBatDau: Date, thoiGianKetThuc: Date, soBuoi: number): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const soBuoiValue = this.myForm.get('soBuoi')!.value;
    soBuoi = soBuoiValue;
    this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.tuanService
      .editTuan(id, thoiGianBatDau, thoiGianKetThuc, soBuoi, authToken)
      .subscribe(
        (data) => {
          console.log(data);
          this.dialog.closeAll();
          this.isLoading = false;
          this.toastr.success('Sửa tuần thành công');
          console.log('Sửa tuần thành công');
          this.TuanComponent.getTuanCanBo();
        },
        (error: any) => {
          this.dialogRef.close('Closed using function');
          this.isLoading = false;
          this.toastr.error('Lỗi sửa tuần');
          console.error('Lỗi sữa tuần:', error);
        }
      );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
