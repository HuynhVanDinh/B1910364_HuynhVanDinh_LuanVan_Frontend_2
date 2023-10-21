import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { CanboService } from 'src/app/canbo.service';
import { DonviService } from 'src/app/donvi.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { ImgClientService } from 'src/app/img-client.service';
import { CanBo } from 'src/app/model/canbo.model';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogCanboComponent } from '../dialog/dialog-canbo/dialog-canbo.component';

@Component({
  selector: 'app-ql-canbo',
  templateUrl: './ql-canbo.component.html',
  styleUrls: ['./ql-canbo.component.css'],
})
export class QlCanboComponent implements OnInit {
  // currentLanguageImage: string = '../../assets/logo/vn.png';
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  canBoList: CanBo[] = [];
  // datas: SinhVien[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

  constructor(
    private fileUploadService: FileUploadService,
    private canBoService: CanboService,
    // private excelService: ExcelService,
    private imgService: ImgClientService,
    private translate: TranslateService,
    private sinhvienService: CanboService,
    private donviService: DonviService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.getAll();
    this.getCanBoList();
  }

  getCanBoList(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.canBoService
          .getCanBoByDonViThucTap(data.maDvtt)
          .subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.danhSachDangKy = data;
            console.log(this.dataSource);
          });
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAll() {
    // this.sinhvienService
    //   .getAllCanBo()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       // Khởi tạo MatTableDataSource và thiết lập paginator
    //       this.dataSource = new MatTableDataSource(res);
    //       this.dataSource.paginator = this.paginator;
    //     },
    //   });
  }

  openDialog(code: any, image: any): void {
    this.dialog.open(OpenwarningComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        image: image,
        CanboComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogCanboComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        CanboComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogCanboComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        canbo: data,
        CanboComponent: this,
      },
      disableClose: true,
    });
    console.log(data);
  }

  searchName: string = '';
  searchSinhVien() {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // console.log(authToken);
      console.error('Access token not found. User is not authenticated.');
      return;
    }
    // this.sinhvienService.searchSinhVien(this.searchName, authToken).subscribe(
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
    this.searchSinhVien();
  }

  exportData(): void {
    // const data = this.sinhvienService.getAllSinhVien().subscribe((data) => {
    //   this.excelService.exportToExcel(data, 'LoaiCoSo');
    // });
  }
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
  // sinhVienList: any[] = [];

  // constructor(private sinhVienService: SinhvienService) {}

  // ngOnInit(): void {
  //   this.getSinhVienList();
  // }

  // getSinhVienList(): void {
  //   this.sinhVienService.getAllSinhVien().subscribe(
  //     (data) => {
  //       this.sinhVienList = data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.error('Lỗi khi lấy danh sách sinh viên:', error);
  //     }
  //   );
  // }
}
