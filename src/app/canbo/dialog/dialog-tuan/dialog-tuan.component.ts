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
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;

  ngOnInit(): void {
    this.myForm = new FormGroup({
      tenDot: new FormControl(),
      thoiGianBatDau: new FormControl(),
      thoiGianKetThuc: new FormControl(),
    });

    if (this.data.isEdit) {
      console.log("hùdhfhj",this.data);
      this.isEditMode = true;
      this.id = this.data.tuan.id_tuan;
      this.thoiGianBatDau = this.data.tuan.batdau;
      this.thoiGianKetThuc = this.data.tuan.hethan;
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
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }

  TuanComponent = this.data.TuanComponent;

  themTuan(thoiGianBatDau: Date, thoiGianKetThuc: Date): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
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
          .createTuan(thoiGianBatDau, thoiGianKetThuc, data.maCB, authToken)
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
  suaTuan(
    id: number,
    thoiGianBatDau: Date,
    thoiGianKetThuc: Date
  ): void {
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
    this.tuanService.editTuan(id, thoiGianBatDau, thoiGianKetThuc, authToken)
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
