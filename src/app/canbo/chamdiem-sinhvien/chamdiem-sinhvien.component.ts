import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CanboService } from 'src/app/canbo.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';
import { DialogChamdiemComponent } from '../dialog/dialog-chamdiem/dialog-chamdiem.component';
import { DialogSuadiemComponent } from '../dialog/dialog-suadiem/dialog-suadiem.component';

@Component({
  selector: 'app-chamdiem-sinhvien',
  templateUrl: './chamdiem-sinhvien.component.html',
  styleUrls: ['./chamdiem-sinhvien.component.css'],
})
export class ChamdiemSinhvienComponent {
  isLoading: boolean = false;
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  displayedColumns: string[] = [
    'ma',
    'hinhAnh',
    'tensinhvien',
    'gtinh',
    'ngsinh',
    'email',
    'trangThai',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    // private donviService: DonviService,
    // private dangKyService: DangkyService,
    private dialog: MatDialog,
    private canboService: CanboService,
    private sinhvienThuctapService: SinhvienThuctapService,
    private fileUploadService: FileUploadService
  ) {
    translate.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.getAllSinhVien();
  }

  getAllSinhVien(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.sinhvienThuctapService
          .getAllKetQuaCanBo(data.maCB)
          .subscribe((dataSV) => {
            this.dataSource = new MatTableDataSource(dataSV);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(dataSV);
          });
      });
    }
    // const accountid = localStorage.getItem('accountid');
    // if (accountid) {
    // this.donviService.getDonvi(accountid).subscribe((data) => {
    //   // console.log(data)
    //   this.sinhvienThuctapService
    //     .getAllKetQuaThucTapDonVi(data.maDvtt)
    //     .subscribe((data) => {
    //       this.dataSource = new MatTableDataSource(data);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //       // this.danhSachDangKy = data;
    //       console.log(this.dataSource);
    //     });
    // });
    // }
  }
  // getColorForTrangThai(trangThai: number): any {
  //   let color;
  //   switch (trangThai) {
  //     case 0:
  //       color = { color: 'orange' };
  //       break;
  //     case 1:
  //       color = { color: 'green' };
  //       break;
  //     case 2:
  //       color = { color: 'red' };
  //       break;
  //     case 3:
  //       color = { color: 'blue' };
  //       break;
  //     default:
  //       color = {};
  //   }
  //   return color;
  // }
  chamdiem(maSV: any) {
    // console.log(maSV);
    this.dialog.open(DialogChamdiemComponent, {
      width: '900px',
      //  height: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        danhgia: maSV,
        CongViecComponent: this,
      },
      disableClose: true,
    });
  }
  suadiem(maSV: any) {
    // console.log(maSV);
    this.dialog.open(DialogSuadiemComponent, {
      width: '900px',
      //  height: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        danhgia: maSV,
        CongViecComponent: this,
      },
      disableClose: true,
    });
  }
  // exportToPdf(url: string) {

  // }
  searchName: string = '';
  searchKhoa() {
    // const authToken = localStorage.getItem('authToken');
    // if (!authToken) {
    //   // console.log(authToken);
    //   console.error('Access token not found. User is not authenticated.');
    //   return;
    // }
    // this.khoaService.searchKhoa(this.searchName, authToken).subscribe(
    //   (data: any) => {
    //     // console.log(authToken);
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   (error) => {
    //     console.error('Error searching for sinh vien:', error);
    //   }
    // );
  }
  search() {
    // this.sinhvienService.searchByName(this.searchName).subscribe((res: any) => {
    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    // });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  refreshSearch() {
    this.searchName = '';
    this.searchKhoa();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  downloadFile(filename: string) {
    this.fileUploadService.getFileOneData(filename).subscribe(
      (data: Blob) => {
        // Xử lý dữ liệu trả về, ví dụ như tạo URL tải xuống
        const downloadUrl = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
      },
      (error) => {
        // Xử lý lỗi
        console.log('Lỗi !!!:', error);
      }
    );
  }
}
