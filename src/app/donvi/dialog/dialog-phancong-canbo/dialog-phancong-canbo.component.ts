import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DonviService } from 'src/app/donvi.service';
import { KetQua } from 'src/app/model/ketqua.model';
import { TargetList } from 'src/app/model/targetList.model';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';

@Component({
  selector: 'app-dialog-phancong-canbo',
  templateUrl: './dialog-phancong-canbo.component.html',
  styleUrls: ['./dialog-phancong-canbo.component.css'],
})
export class DialogPhancongCanboComponent implements OnInit {
  sourceList: string[] = [];
  targetList: KetQua[] = [];
  searchText: string = '';

  ngOnInit() {
    this.getAllSinhVien();
    this.targetList = [];
    console.log('jhsdhk', this.data);
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private donviService: DonviService,
    public dialogRef: MatDialogRef<DialogPhancongCanboComponent>,
    private sinhvienThuctapService: SinhvienThuctapService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  getAllSinhVien(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((donviData) => {
        this.sinhvienThuctapService
          .getKetQuaThucTapChuaPhanCong(donviData.maDvtt)
          .subscribe((sinhvienData) => {
            // Ở đây, bạn cần trích xuất thông tin sinh viên từ sinhvienData và gán vào sourceList.
            // Ví dụ: Giả sử bạn muốn lấy tên của sinh viên:
            this.sourceList = sinhvienData;
            console.log('sinh viên', sinhvienData);
            console.log(this.sourceList);
          });
      });
    }
  }
  onSubmit() {
    // Xử lý logic khi người dùng nhấn nút "Gửi"
    console.log('Danh sách đích:', this.targetList);
    const maKqtt = this.targetList;
    const maCbList = this.data.canbo.maCB;
    console.log('maKqtt', maKqtt);
    console.log('maCb', maCbList);
    this.sinhvienThuctapService
      .updateMultipleKetQuaThucTap(maKqtt, maCbList)
      .subscribe(
        (updatedKetQuaThucTaps) => {
          console.log('Cập nhật thành công:', updatedKetQuaThucTaps);
        },
        (error) => {
          console.error('Lỗi cập nhật:', error);
        }
      );
    // console.log('mã nè',maKqtt)
  }
}
