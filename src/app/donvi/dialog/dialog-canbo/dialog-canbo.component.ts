import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { CanboService } from 'src/app/canbo.service';
import { DonviService } from 'src/app/donvi.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { ImgClientService } from 'src/app/img-client.service';

@Component({
  selector: 'app-dialog-canbo',
  templateUrl: './dialog-canbo.component.html',
  styleUrls: ['./dialog-canbo.component.css'],
})
export class DialogCanboComponent implements OnInit, AfterViewChecked {
  maCB!: number;
  sdt!: string;
  date: Date[] | undefined;
  username!: string;
  email!: string;
  password!: string;
  isLoading: boolean = false;
  isEditMode!: boolean;
  myForm!: FormGroup;
  ngaysinh!: Date;
  tenCB!: string;
  isEdit!: boolean;
  gender!: string;
  currentPage = 1;
  isFocused = false;
  @ViewChild('inputElement')
  inputElement!: ElementRef;

  ngOnInit(): void {
    (this.gender = 'Nam'),
      (this.myForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        email: new FormControl(),
        sdt: new FormControl(),
        lopNameControl: new FormControl(),
        ngaysinh: new FormControl(),
        tenCB: new FormControl(),
        gender: new FormControl(),
      }));
    if (this.data.isEdit) {
      console.log('hihi', this.data);
      this.isEditMode = true;
      this.maCB = this.data.canbo.maCB;
      this.tenCB = this.data.canbo.tenCB;
      this.ngaysinh = this.data.canbo.ngSinh;
      this.sdt = this.data.canbo.sdtCB;
      this.gender = this.data.canbo.gtinh;
    } else {
      this.isEditMode = false;
    }
  }
  ngAfterViewChecked() {
    if (this.isFocused) {
      this.inputElement.nativeElement.focus();
      this.isFocused = false;
    }
  }
  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private imgService: ImgClientService,
    private canBoService: CanboService,
    private donviService: DonviService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCanboComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.isEdit = data.isEdit;
  }
  onPhoneNumberInput(event: any) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue.length > 10) {
      this.sdt = numericValue.slice(0, 10);
    } else {
      this.sdt = numericValue;
    }

    this.myForm.get('sdt')!.setValue(this.sdt);
  }
  onNext() {
    if (this.myForm.valid) {
      this.currentPage++;
    }
  }
  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.isFocused = true;
    }
  }

  refreshForm() {
    this.myForm.reset();
    this.myForm.markAsUntouched();
    this.myForm.markAsPristine();
  }
  CanboComponent = this.data.CanboComponent;
  themSinhVien(
    tencb: string,
    gt: string,
    ngaysinh: Date,
    sdt: string,
    username: string,
    password: string,
    email: string
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.dialogRef.close('Closed using function');
    this.isLoading = true;
    this.imgService
      .getDefaultImageAsFile()
      .subscribe((defaultImageFile: File) => {
        this.fileUploadService
          .uploadFile(defaultImageFile)
          .subscribe((data) => {
            const authToken = localStorage.getItem('authToken');
            const accountid = localStorage.getItem('accountid');
            const hinhAnh = data.filename;
            if (!authToken) {
              console.error(
                'Access token not found. User is not authenticated.'
              );
              return;
            }
            this.donviService.getDonvi(accountid).subscribe((res) => {
              console.log(res.maDvtt);
              const donvithuctap = res.maDvtt;
              this.canBoService
                .createCanBo(
                  tencb,
                  gt,
                  hinhAnh,
                  ngaysinh,
                  sdt,
                  donvithuctap,
                  username,
                  password,
                  email,
                  authToken
                )
                .subscribe(
                  () => {
                    this.dialog.closeAll();
                    this.isLoading = false;
                    this.toastr.success('Thêm thành công');
                    console.log('Thêm cán bộ thành công');
                    this.CanboComponent.getCanBoList();
                  },
                  (error: any) => {
                    this.dialogRef.close('Closed using function');
                    this.isLoading = false;
                    this.toastr.error('Lỗi thêm cán bộ');
                    console.error('Lỗi thêm cán bộ:', error);
                  }
                );
            });
          });
      });
  }

  suaSinhVien(
    macb: number,
    tencb: string,
    gt: string,
    ngaysinh: Date,
    sdt: string
  ): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // this.dialogRef.close('Closed using function');
    const authToken = localStorage.getItem('authToken');
    const accountid = localStorage.getItem('accountid');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.donviService.getDonvi(accountid).subscribe(async(res) => {
      console.log(res.maDvtt);
      const donvithuctap = res.maDvtt;
      await this.canBoService
        .editCanBo(macb, tencb, gt, ngaysinh, sdt, donvithuctap, authToken)
        .subscribe({
          next: async () => {
           this.ngZone.run(() => {
             this.dialog.closeAll();
             this.isLoading = false;
             this.toastr.success('Sửa thành công');
             console.log('Sửa cán bộ thành công');
             this.CanboComponent.getCanBoList();
           });
          },
          error: (error: any) => {
           this.ngZone.run(() => {
             this.dialogRef.close('Closed using function');
             this.isLoading = false;
             this.toastr.error('Lỗi sửa cán bộ');
             console.error('Lỗi sửa cán bộ:', error);
           });
          },
        });
    });
  }
  onGenderChange(event: any) {
    this.gender = event.value;
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
}
