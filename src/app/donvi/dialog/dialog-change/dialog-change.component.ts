import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CanboService } from 'src/app/canbo.service';
import { DonviService } from 'src/app/donvi.service';
import { KetQua } from 'src/app/model/ketqua.model';
import { RefreshService } from 'src/app/refresh-service.service';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';

@Component({
  selector: 'app-dialog-change',
  templateUrl: './dialog-change.component.html',
  styleUrls: ['./dialog-change.component.css'],
})
export class DialogChangeComponent {
  danhSachCanBo: any[] = [];
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  tenCB!: number;
  isEdit!: boolean;
  isEditMode!: boolean;
  maSV!: KetQua;

  ngOnInit(): void {
    this.getCanBoList();
    this.myForm = new FormGroup({
      tenCB: new FormControl(),
    });
  }
  getCanBoList(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.canBoService
          .getCanBoByDonViThucTap(data.maDvtt)
          .subscribe((data) => {
            this.danhSachCanBo = data as any[];
            // console.log("ds can bo", this.danhSachCanBo)
          });
      });
    }
  }
  constructor(
    private sinhvienThuctapService: SinhvienThuctapService,
    private canBoService: CanboService,
    // private khoaService: KhoaService,
    private donviService: DonviService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    // private lopService: LopService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  refreshForm() {
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
  }
  PhancongComponent = this.data.PhancongComponent;
  thaydoi(masv: KetQua, tencb: number): void {
    masv = this.data.sinhvien.maSV;
    const canBoValue = this.myForm.get('tenCB')!.value;

    // console.log(khoaNameValue);
    if (canBoValue === null || canBoValue === undefined) {
      // Hiển thị lỗi và ngăn thực hiện thaydoi nếu giá trị chưa được chọn
      this.myForm.get('tenCB')!.setErrors({ required: true });
      return;
    }
    tencb = canBoValue;
    this.dialogRef.close('Closed using function');
    console.log(masv, tencb);
    // const authToken = localStorage.getItem('authToken');
    // if (!authToken) {
    //   // console.log(authToken);
    //   console.error('Access token not found. User is not authenticated.');
    //   return;
    // }
    this.isLoading = true;
    this.sinhvienThuctapService.changeCanBo(masv,tencb).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Thay đổi thành công');
        console.log('Thay đổi thành công');
        this.PhancongComponent.getAllSinhVien();
        this.refreshService.triggerRefresh();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi thay đổi');
        console.error('Lỗi thay đổi:', error);
      }
    );
  }

  closedialog() {
    this.dialogRef.close('Closed using function');
    // this.toastr.success('Thêm thành công');
  }
}
