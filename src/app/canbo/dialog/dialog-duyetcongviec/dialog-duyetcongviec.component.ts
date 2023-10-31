import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-duyetcongviec',
  templateUrl: './dialog-duyetcongviec.component.html',
  styleUrls: ['./dialog-duyetcongviec.component.css'],
})
export class DialogDuyetcongviecComponent {
  name: any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    // private fileUploadService: FileUploadService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogDuyetcongviecComponent>,
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
    const congviec = this.data.congviec;
    // const image = this.data.image;
    const CongViecComponent = this.data.CongViecComponent;
    // console.log(congviec);
    CongViecComponent.congViecService.duyetCongViec(congviec.maCV,congviec.tienDo,authToken).subscribe(() =>{
    this.toastr.success('Duyệt thành công');
          console.log('Xóa thành công');
          CongViecComponent.getAllCongViecBySinhVienAndCanBoAndTuan();
          this.dialogRef.close('Closed using function');
          // Xử lý logic sau khi xóa thành công
    },
    (error: any) => {
          this.toastr.error('Duyệt thất bại');
          console.error('Duyệt thất bại:', error);
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
