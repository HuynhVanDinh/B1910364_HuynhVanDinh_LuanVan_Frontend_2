import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaidangService } from 'src/app/baidang.service';
import { OpenwarningComponent } from 'src/app/openwarning/openwarning.component';
import { DialogbaidangComponent } from '../dialog/dialogbaidang/dialogbaidang.component';

@Component({
  selector: 'app-baidang',
  templateUrl: './baidang.component.html',
  styleUrls: ['./baidang.component.css'],
})
export class BaidangComponent {
  isEdit: boolean = false;
  isDrawerOpen: boolean = true;
  panelOpenState = false;
  // datas: Khoa[] = [];
  pageSize = 5; // Số mục trên mỗi trang
  pageSizeOptions: number[] = [5, 10, 25, 50]; // Các tùy chọn số mục trên trang
  pageIndex = 0;

  constructor(
    // private pdfService: PdfService,
    // private fileUploadService: FileUploadService,
    // private excelService: ExcelService,
    private translate: TranslateService,
    private baidangService: BaidangService,
    private dialog: MatDialog
  ) {
    translate.setDefaultLang('vn');
  }

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.baidangService
      .getAllBaiDang()
      .subscribe({
        next: (res) => {
          console.log(res);
          // Khởi tạo MatTableDataSource và thiết lập paginator
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(code: any, image: any): void {
    this.dialog.open(OpenwarningComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        code: code,
        image: image,
        SinhvienComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogthem(): void {
    this.isEdit = false;
    this.dialog.open(DialogbaidangComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        BaiDangComponent: this,
      },
      disableClose: true,
    });
  }
  openEditDialog(data: any): void {
    console.log(data);
    this.isEdit = true;
    this.dialog.open(DialogbaidangComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        baidang: data,
        baiDangComponent: this,
      },
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
}
