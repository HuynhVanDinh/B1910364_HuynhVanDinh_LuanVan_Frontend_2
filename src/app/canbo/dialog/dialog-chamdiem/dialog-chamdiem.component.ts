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
import { ToastrService } from 'ngx-toastr';
import { BieumauService } from 'src/app/bieumau.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiemcanboService } from 'src/app/diemcanbo.service';
import { CanboService } from 'src/app/canbo.service';
@Component({
  selector: 'app-dialog-chamdiem',
  templateUrl: './dialog-chamdiem.component.html',
  styleUrls: ['./dialog-chamdiem.component.css'],
})
export class DialogChamdiemComponent {
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
    this.getDiemCanBo();
    this.getBieuMau();

    //  console.log('Mota congviec', this.data);
    // this.myForm = new FormGroup({
    //   diem: new FormControl(),
    // });

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
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private diemCanBoService: DiemcanboService,
    // private congViecService: CongviecService,
    // private khoaService: KhoaService,
    private canboService: CanboService,
    private toastr: ToastrService,
    private elementRef: ElementRef,
    // private refreshService: RefreshService,
    // private tuanService: TuanService,
    private bieuMauService: BieumauService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogChamdiemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = this.fb.group({
      diem: [
        null,
        [Validators.required, Validators.min(0.1), Validators.max(10)],
      ],
    });

    this.isEdit = data.isEdit;
  }
  getDiemCanBo(){
    this.diemCanBoService.getAll().subscribe((res)=>{
      console.log("hfuskjhghskghsfjkgfkufdjkghdgdhjk",res);
    })
  }
  tinhTongDiem() {
    this.tongDiem = 0;

    // Lặp qua danh sách tên control và tính tổng điểm
    for (const item of this.listBieuMau) {
      const controlName = 'diem' + item.maPDCB;
      const control = this.myForm.get(controlName);
      if (control && control.valid) {
        this.tongDiem += parseFloat(control.value);
      }
    }
  }
  getBieuMau() {
    this.bieuMauService.getBieuMau().subscribe((res) => {
      console.log(res);

      this.listBieuMau = res;
      this.myForm = this.fb.group({});

      // Sử dụng một vòng lặp để thêm các FormControl động vào FormGroup
      for (let j = 0; j < this.listBieuMau.length; j++) {
        // console.log(this.listBieuMau[j].maPDCB);
        this.myForm.addControl(
          `diem${this.listBieuMau[j].maPDCB}`,
          new FormControl(null, [
            Validators.required,
            Validators.min(0.1),
            Validators.max(10),
          ])
        );
      }
    });
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
                 .createDiemCanBo(control.value,
            item.maPDCB,
            this.data.danhgia.sinhVien.maSV, data.maCB, authToken)
                 .subscribe(
                   () => {
                     this.dialog.closeAll();
                     this.isLoading = false;
                     this.toastr.success('Chấm điểm thành công');
                     this.snackBar.open(
                       'Chấm điểm thành công',
                       'Đóng',
                       {
                         duration: 3000,
                       }
                     );
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
      // this.canboService.getMaCB(accountid).subscribe((data) => {
      //   this.congViecService
      //     .createCongViec(Mota, tuan, maSV, data.maCB, authToken)
      //     .subscribe(
      //       () => {
      //         this.dialog.closeAll();
      //         this.isLoading = false;
      //         this.toastr.success('Thêm công việc thành công');
      //         console.log('Thêm công việc thành công');
      //         this.refreshService.triggerRefresh();
      //         // this.TuanComponent.getTuanCanBo();
      //       },
      //       (error: any) => {
      //         this.dialogRef.close('Closed using function');
      //         this.isLoading = false;
      //         this.toastr.error('Lỗi thêm công việc');
      //         console.error('Lỗi thêm công việc:', error);
      //       }
      //     );
      // });
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
      // this.canboService.getMaCB(accountid).subscribe((data) => {
      //   this.congViecService
      //     .editCongViec(id, Mota, maSV, data.maCB, authToken)
      //     .subscribe(
      //       (data) => {
      //         console.log(data);
      //         this.dialog.closeAll();
      //         this.isLoading = false;
      //         this.toastr.success('Sửa công việc thành công');
      //         console.log('Sửa công việc thành công');
      //         this.refreshService.triggerRefresh();
      //         // this.TuanComponent.getTuanCanBo();
      //       },
      //       (error: any) => {
      //         this.dialogRef.close('Closed using function');
      //         this.isLoading = false;
      //         this.toastr.error('Lỗi sửa công việc');
      //         console.error('Lỗi sữa công việc:', error);
      //       }
      //     );
      // });
    }
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
