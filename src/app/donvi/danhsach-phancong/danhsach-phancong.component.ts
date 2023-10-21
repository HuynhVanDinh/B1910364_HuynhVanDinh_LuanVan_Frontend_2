import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CanboService } from 'src/app/canbo.service';
import { DonviService } from 'src/app/donvi.service';
import { FileUploadService } from 'src/app/file-upload.service';
import { ImgClientService } from 'src/app/img-client.service';
import { CanBo } from 'src/app/model/canbo.model';
import { RefreshService } from 'src/app/refresh-service.service';

@Component({
  selector: 'app-danhsach-phancong',
  templateUrl: './danhsach-phancong.component.html',
  styleUrls: ['./danhsach-phancong.component.css'],
})
export class DanhsachPhancongComponent implements OnInit, OnDestroy {
  canBoList: CanBo[] = [];
  private subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.refreshService.refresh$.subscribe(() => {
      this.getCanBoList();
    });
    this.getCanBoList();
  }
  ngOnDestroy(): void {
    // Đảm bảo hủy đăng ký khi component bị hủy
    this.subscription.unsubscribe();
  }
  constructor(
    private refreshService: RefreshService,
    private fileUploadService: FileUploadService,
    private canBoService: CanboService,
    // private excelService: ExcelService,
    private imgService: ImgClientService,
    private translate: TranslateService,
    private donviService: DonviService
  ) {
    translate.setDefaultLang('vn');
  }
  getCanBoList(): void {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.canBoService
          .getCanBoByDonViThucTap(data.maDvtt)
          .subscribe((canBoData) => {
            this.canBoList = canBoData;
            console.log(canBoData);
          });
      });
    }
  }
}
