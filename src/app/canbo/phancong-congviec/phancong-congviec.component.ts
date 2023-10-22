import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanboService } from 'src/app/canbo.service';
import { TuanService } from 'src/app/tuan.service';
import { DialogTuanComponent } from '../dialog/dialog-tuan/dialog-tuan.component';

@Component({
  selector: 'app-phancong-congviec',
  templateUrl: './phancong-congviec.component.html',
  styleUrls: ['./phancong-congviec.component.css'],
})
export class PhancongCongviecComponent implements OnInit {
  tuans: any[] = [];
  isEdit: boolean = false;
  constructor(
    private dialog: MatDialog,
    private tuanService: TuanService,
    private canboService: CanboService
  ) {}
  // @Input() sinhvien!: any;
  ngOnInit(): void {
    // this.getTuan();
    // console.log('jkgfdsj', this.sinhvien);
    this.getTuanCanBo();
  }
  // getTuan() {
  //   this.tuanService.getAllTuan().subscribe((data) => {
  //      this.tuans = data;
  //     console.log('data nè', data);
  //   });
  // }
  getTuanCanBo() {
    const accountid = localStorage.getItem('accountid');
    if (accountid) {
      this.canboService.getMaCB(accountid).subscribe((data) => {
        this.tuanService.getTuanCanBo(data.maCB).subscribe((data) => {
          this.tuans = data;
          console.log(this.tuans);
        });
      });
    }
  }
  openDialogThem(): void {
    this.dialog.open(DialogTuanComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        TuanComponent: this,
      },
      disableClose: true,
    });
  }
  openDialogSua(data: any): void {
    this.isEdit = true;
    this.dialog.open(DialogTuanComponent, {
      width: '700px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        isEdit: this.isEdit,
        tuan: data,
        TuanComponent: this,
      },
      disableClose: true,
    });
    console.log(data)
  }
}
