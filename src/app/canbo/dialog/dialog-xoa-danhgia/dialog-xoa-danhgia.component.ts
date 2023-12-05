import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-xoa-danhgia',
  templateUrl: './dialog-xoa-danhgia.component.html',
  styleUrls: ['./dialog-xoa-danhgia.component.css'],
})
export class DialogXoaDanhgiaComponent {
  isLoading: boolean = false;
  name: any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    // private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogXoaDanhgiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm để xóa
  accept() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    const maDG = this.data.danhgia;
    const CongViecComponent = this.data.CongViecComponent;
    CongViecComponent.danhGiaService.deleteDanhGia(maDG, authToken).subscribe(
      () => {
        this.isLoading = false;
        this.toastr.success('Gỡ thành công');
        console.log('Gỡ thành công');
        CongViecComponent.getAllCongViecBySinhVienAndCanBoAndTuan();
        CongViecComponent.getAllDanhGiaBySinhVienAndCanBoAndTuan();
        this.dialogRef.close('Closed using function');
        // Xử lý logic sau khi xóa thành công
      },
      (error: any) => {
        this.isLoading = false;
        this.toastr.error('Gỡ thất bại');
        console.error('Gỡ thất bại:', error);
        // Xử lý logic khi có lỗi xảy ra
      }
    );

    // this.fileUploadService.deleteFile(image).subscribe(() => {
    //   LoaicosoComponent.loaicosoService.xoaLoaiCoSo(code).subscribe(
    //     () => {
    //       this.toastr.success('Xoá thành công');
    //       console.log('Xóa thành công');
    //       LoaicosoComponent.getAll();
    //       this.dialogRef.close('Closed using function');
    //       // Xử lý logic sau khi xóa thành công
    //     },
    //     (error: any) => {
    //       this.toastr.error('Lỗi xóa loại cơ sở');
    //       console.error('Lỗi xóa loại cơ sở:', error);
    //       // Xử lý logic khi có lỗi xảy ra
    //     }
    //   );
    // });
  }
}
