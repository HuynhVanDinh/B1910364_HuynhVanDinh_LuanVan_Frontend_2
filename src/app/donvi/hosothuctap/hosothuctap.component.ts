import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaidangService } from 'src/app/baidang.service';
import { DangkyService } from 'src/app/dangky.service';
import { DonviService } from 'src/app/donvi.service';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogPdfComponent } from '../dialog/dialog-pdf/dialog-pdf.component';
import { DialogbaidangComponent } from '../dialog/dialogbaidang/dialogbaidang.component';

@Component({
  selector: 'app-hosothuctap',
  templateUrl: './hosothuctap.component.html',
  styleUrls: ['./hosothuctap.component.css'],
})
export class HosothuctapComponent implements OnInit {
  // danhSachDangKy: any[] = [];
  isLoading: boolean = false;
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;
  displayedColumns: string[] = [
    'ma',
    'tensinhvien',
    'noiDung',
    'ngayDang',
    'diem',
    'cv',
    'trangThai',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private donviService: DonviService,
    private dangKyService: DangkyService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  ngOnInit(): void {
    this.getAllDangKy();
  }

  getAllDangKy(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.dangKyService.getAllDangky(data.maDvtt).subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.danhSachDangKy = data;
          console.log(this.dataSource);
        });
      });
    }

    // this.donviService.getAllDonvi().subscribe((data) => {
    //   console.log('donvi',data);
    // });
  }
  getColorForTrangThai(trangThai: number): any {
    let color;
    switch (trangThai) {
      case 0:
        color = { color: 'orange' };
        break;
      case 1:
        color = { color: 'green' };
        break;
      case 2:
        color = { color: 'red' };
        break;
      case 3:
        color = { color: 'blue' };
        break;
      default:
        color = {}; // Mặc định không có màu
    }
    return color;
  }
  updateDangKyStatus(maDK: number, baiDangId: number, trangThaiMoi: number) {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    this.isLoading = true;
    this.dangKyService
      .updateTrangThaiDangKy(maDK, baiDangId, trangThaiMoi, authToken)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success('Tiếp nhận thành công');
          this.getAllDangKy();
          // Handle success
          console.log('Status updated successfully:', response);
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(error.message);
          // Handle error
          console.error('Error updating status:', error);
        }
      );
  }
  exportToPdf(url: string) {
    // this.pdfService.exportKhoaToPdf().subscribe((response) => {
    //   const blob = new Blob([response], { type: 'application/pdf' });
    console.log("jsfsdjk",url);
    this.dialog.open(DialogPdfComponent, {
      width: '900px',
      height: '750px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { url },
      disableClose: true,
    });
  }
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
  // constructor(
  //   // private pdfService: PdfService,
  //   // private fileUploadService: FileUploadService,
  //   // private excelService: ExcelService,
  //   private translate: TranslateService,
  //   private baidangService: BaidangService,
  //   private dialog: MatDialog
  // ) {
  //   translate.setDefaultLang('vn');
  // }

  // dataSource = new MatTableDataSource<any>();

  // ngOnInit() {
  //   this.getAll();
  // }

  // getAll() {
  //   this.baidangService.getAllBaiDang().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       // Khởi tạo MatTableDataSource và thiết lập paginator
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //   });
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // openDialog(code: any, image: any): void {
  //   this.dialog.open(OpenwarningComponent, {
  //     width: '350px',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: {
  //       code: code,
  //       image: image,
  //       SinhvienComponent: this,
  //     },
  //     disableClose: true,
  //   });
  // }
  // openDialogthem(): void {
  //   this.isEdit = false;
  //   this.dialog.open(DialogbaidangComponent, {
  //     width: '700px',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: {
  //       isEdit: this.isEdit,
  //       BaiDangComponent: this,
  //     },
  //     disableClose: true,
  //   });
  // }
  // openEditDialog(data: any): void {
  //   console.log(data);
  //   this.isEdit = true;
  //   this.dialog.open(DialogbaidangComponent, {
  //     width: '700px',
  //     enterAnimationDuration: '300ms',
  //     exitAnimationDuration: '300ms',
  //     data: {
  //       isEdit: this.isEdit,
  //       baidang: data,
  //       baiDangComponent: this,
  //     },
  //     disableClose: true,
  //   });
  // }
}
