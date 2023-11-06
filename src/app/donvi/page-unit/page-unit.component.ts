import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CanboService } from 'src/app/canbo.service';
import { DonviService } from 'src/app/donvi.service';
@Component({
  selector: 'app-page-unit',
  templateUrl: './page-unit.component.html',
  styleUrls: ['./page-unit.component.css'],
})
export class PageUnitComponent implements OnInit {
  selectedNodes!: TreeNode[];
  donvi!: any;

  nameDvtt!: string;
  constructor(
    private donviService: DonviService,
    private canBoService: CanboService
  ) {}
  ngOnInit(): void {
    this.getDonVi();
  }
  getDonVi() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        console.log(data);
        this.donvi = data;
        this.nameDvtt = this.donvi.tenDvtt;
        console.log(this.nameDvtt);
        this.initializeData();
      });
    }
  }
  getCanBoByDonVi() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.canBoService
          .getCanBoByDonViThucTap(data.maDvtt)
          .subscribe((data) => {});
      });
    }
  }
  initializeData() {
    this.data = [
      {
        expanded: true,
        type: 'person',
        data: {
          image:
            'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
          name: this.nameDvtt,
          title: 'Địa chỉ:' + this.donvi.diaChi + '-SĐT' + this.donvi.soDt,
        },
        children: this.getCanBoChildren(),
      },
    ];
  }
  getCanBoChildren(): TreeNode[] {
    const children: TreeNode[] = [];
    // Lấy danh sách cán bộ từ CanboService dựa trên đơn vị
    // Thay đổi 'data.maDvtt' thành mã đơn vị của bạn
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.donviService.getDonvi(accountid).subscribe((data) => {
        // console.log(data)
        this.canBoService
          .getCanBoByDonViThucTap(data.maDvtt)
          .subscribe((canBoList) => {
            console.log(canBoList);
            canBoList.forEach((canBo: any) => {
              children.push({
                expanded: true,
                type: 'person',
                data: {
                  image: 'http://localhost:8080/file/' + canBo.hinhAnh, // Sử dụng hình ảnh cán bộ
                  name: canBo.tenCB, // Sử dụng tên cán bộ
                  title: "SĐT: "+ canBo.sdtCB, // Sử dụng chức vụ cán bộ
                },
                // Bạn có thể thêm children bổ sung nếu cần
              });
            });
          });
      });
    }
    return children;
  }

  data: TreeNode[] = [];
}
