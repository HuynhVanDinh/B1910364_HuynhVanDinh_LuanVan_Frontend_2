import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { BaidangService } from 'src/app/baidang.service';

@Component({
  selector: 'app-dialogbaidang',
  templateUrl: './dialogbaidang.component.html',
  styleUrls: ['./dialogbaidang.component.css'],
})
export class DialogbaidangComponent implements OnInit, OnDestroy {
  showInputField: boolean = false;
  editor!: Editor;
  html = '';
  isLoading: boolean = false;
  id!: number;
  myForm!: FormGroup;
  // datas: Khoa[] = [];
  khoaName!: string;
  trocap: number | null = null;
  soluong!: string;
  khoaSdt!: string;
  isEdit!: boolean;
  isEditMode!: boolean;
  text: string = '';
  // quy_mo!: string;
  // loai_hinh!: string;
  // latitude!: number;
  // longitude!: number;
  // geojson!: string;
  // address!: string;
  // image!: string;
  // files!: any[];
  // selectedFile: File | undefined;
  ngOnInit(): void {
    this.editor = new Editor();
    this.myForm = new FormGroup({
      trocap: new FormControl(),
      soluong: new FormControl(),
      text: new FormControl(),
    });
    if (this.data.isEdit) {
      this.isEditMode = true;
      // console.log(this.data);
      this.id = this.data.khoa.khoaId;
      this.khoaName = this.data.khoa.khoaName;
      this.khoaSdt = this.data.khoa.khoaSdt;
    } else {
      this.isEditMode = false;
    }
  }
  constructor(
    private toastr: ToastrService,
    private baidangService: BaidangService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogbaidangComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  onCheckboxChange() {
    // this.showInputField = !this.showInputField;
    this.trocap = null;
  }
  onPhoneNumberInput(event: any) {
    // Lọc và chỉ cho phép các ký tự số
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Giới hạn độ dài chuỗi số điện thoại tối đa
    if (numericValue.length > 3) {
      this.soluong = numericValue.slice(0, 3);
    } else {
      this.soluong = numericValue;
    }

    // Cập nhật giá trị vào formControl
    this.myForm.get('soluong')!.setValue(this.soluong);
  }
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  refreshForm() {
    if (this.data.isEdit) {
      this.id = this.data.khoa.khoaId;
      this.khoaName = this.data.khoa.khoaName;
      this.khoaSdt = this.data.khoa.khoaSdt;
    } else {
      this.myForm.reset();
      this.myForm.markAsUntouched();
      this.myForm.markAsPristine();
    }
  }
  BaiDangComponent = this.data.BaiDangComponent;
  themKhoa(text: string, soluong: string, trocap: number | null): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');
    console.log(text, soluong, trocap);
    // if (this.selectedFile) {
    //   this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //     (data) => {
    //       image = data.filename;
    const authToken = localStorage.getItem('authToken');
    const madv = localStorage.getItem('accountid');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    console.log(madv);
    this.baidangService.thembaidang(text, soluong, trocap, madv, authToken).subscribe(
      () => {
        this.dialog.closeAll();
        this.isLoading = false;
        this.toastr.success('Thêm thành công');
        console.log('Thêm bài đăng thành công');
        this.BaiDangComponent.getAll();
      },
      (error: any) => {
        this.dialogRef.close('Closed using function');
        this.isLoading = false;
        this.toastr.error('Lỗi thêm bài đăng');
        console.error('Lỗi thêm bài đăng:', error);
      }
    );
  }
  suaKhoa(
    id: number,
    text: string,
    soluong: string,
    trocap: number | null
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close('Closed using function');

    // if (this.selectedFile) {
    //   this.fileUploadService.uploadFile(this.selectedFile).subscribe(
    //     (data) => {
    //       image = data.filename;
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    // this.khoaService.suakhoa(id, name, code, authToken).subscribe(
    //   () => {
    //     this.dialog.closeAll();
    //     this.isLoading = false;
    //     this.toastr.success('Sửa thành công');
    //     console.log('Sửa bài đăng thành công');
    //     this.KhoaComponent.getAll();
    //   },
    //   (error: any) => {
    //     this.dialogRef.close('Closed using function');
    //     this.isLoading = false;
    //     this.toastr.error('Lỗi sửa bài đăng');
    //     console.error('Lỗi sửa bài đăng:', error);
    //   }
    // );
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
