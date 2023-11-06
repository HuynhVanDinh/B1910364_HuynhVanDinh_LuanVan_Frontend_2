import { Component, ElementRef, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { BieumauService } from 'src/app/bieumau.service';
import { CanboService } from 'src/app/canbo.service';
import { DiemcanboService } from 'src/app/diemcanbo.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-dialog-suadiem',
  templateUrl: './dialog-suadiem.component.html',
  styleUrls: ['./dialog-suadiem.component.css'],
})
export class DialogSuadiemComponent {
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  Mota!: string;
  thoiGianBatDau!: Date;
  thoiGianKetThuc!: Date;
  isEdit!: boolean;
  isEditMode!: boolean;
  listBieuMau: any[] = [];
  diem!: Float32Array;
  tongDiem = 0;
  // elementRef: any;
  ngOnInit(): void {
    console.log(this.data);
    this.getDiemCanBoBySinhVien();

  }

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private diemCanBoService: DiemcanboService,
    private cdr: ChangeDetectorRef,
    // private congViecService: CongviecService,
    // private khoaService: KhoaService,
    private canboService: CanboService,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogSuadiemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.myForm = this.fb.group({
    //   diem: [
    //     null,
    //     [Validators.required, Validators.min(0.1), Validators.max(10)],
    //   ],
    // });

    this.isEdit = data.isEdit;
  }

  getDiemCanBoBySinhVien() {
    this.diemCanBoService
      .getAllBySinhVien(this.data.danhgia.sinhVien.maSV)
      .subscribe((res) => {
        this.listBieuMau = res;
        console.log('údgisdfgsdhgfhs', this.listBieuMau);
        this.myForm = this.fb.group({});

        // Sử dụng một vòng lặp để thêm các FormControl động vào FormGroup
        for (let j = 0; j < this.listBieuMau.length; j++) {
          // console.log(this.listBieuMau[j].maPDCB);
          this.myForm.addControl(
            `diem${this.listBieuMau[j].maPDCB}`,
            new FormControl(this.listBieuMau[j].diemCB, [
              Validators.required,
              Validators.min(0.1),
              Validators.max(10),
            ])
          );
        }
        this.cdr.detectChanges();
      });
  }
  tinhTongDiem() {
    this.tongDiem = 0;
    for (const item of this.listBieuMau) {
      const controlName = 'diem' + item.maPDCB;
      const control = this.myForm.get(controlName);
      if (control && control.valid) {
        this.tongDiem += parseFloat(control.value);
      }
    }
  }

  submitDiem() {
    if (this.myForm.valid) {
      const maPDCBValues = [];
      for (const item of this.listBieuMau) {
        const controlName = 'diem' + item.maPDCB;
        const control = this.myForm.get(controlName);
        if (control && control.valid) {
          const authToken = localStorage.getItem('authToken');
          if (!authToken) {
            // console.log(authToken);
            console.error('Access token not found. User is not authenticated.');
            return;
          }
          const accountid = localStorage.getItem('accountid');
          this.isLoading = true;
          if (accountid) {
            this.canboService.getMaCB(accountid).subscribe((data) => {
              this.diemCanBoService
                .createDiemCanBo(
                  control.value,
                  item.maPDCB,
                  this.data.danhgia.sinhVien.maSV,
                  data.maCB,
                  authToken
                )
                .subscribe(
                  () => {
                    this.dialog.closeAll();
                    this.isLoading = false;
                    this.toastr.success('Chấm điểm thành công');
                    this.snackBar.open('Chấm điểm thành công', 'Đóng', {
                      duration: 3000,
                    });
                    console.log('Chấm điểm thành công');
                    //  this.refreshService.triggerRefresh();
                    // this.TuanComponent.getTuanCanBo();
                  },
                  (error: any) => {
                    this.dialogRef.close('Closed using function');
                    this.isLoading = false;
                    this.toastr.error('Lỗi chấm điểm');
                    console.error('Lỗi chấm điểm:', error);
                  }
                );
            });
          }
          maPDCBValues.push({
            maPDCB: item.maPDCB,
            value: control.value,
            maSV: this.data.danhgia.sinhVien.maSV,
          });
        }
      }
      console.log('Dữ liệu', maPDCBValues);
    } else {
      this.snackBar.open(
        'Biểu mẫu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.',
        'Đóng',
        {
          duration: 3000,
        }
      );
    }
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

  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
