import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SinhVien } from 'src/app/model/sinhvien.model';
import { ThucTap } from 'src/app/model/thuctap.model';
import { SinhvienThuctapService } from 'src/app/sinhvien-thuctap.service';
import { CanBo } from '../../model/canbo.model';
import { DialogChangeComponent } from '../dialog/dialog-change/dialog-change.component';
import { DialogPhancongCanboComponent } from '../dialog/dialog-phancong-canbo/dialog-phancong-canbo.component';

@Component({
  selector: 'app-phancong-canbo',
  templateUrl: './phancong-canbo.component.html',
  styleUrls: ['./phancong-canbo.component.css'],
})
export class PhancongCanboComponent implements OnInit {
  listsinhvien!: any[];
  ngOnInit(): void {
    this.getAllSinhVien();
  }
  constructor(
    private dialog: MatDialog,
    private sinhvienThuctapService: SinhvienThuctapService
  ) {}
  @Input() canbo!: CanBo;
  // longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  // from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  // originally bred for hunting.`;
  openDialogPhancong(data: any): void {
    this.dialog.open(DialogPhancongCanboComponent, {
      width: '1000px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        canbo: data,
        PhancongCanboComponent: this,
      },
      disableClose: true,
    });

  }
  getAllSinhVien() {
    this.sinhvienThuctapService
      .getAllKetQuaCanBo(this.canbo.maCB)
      .subscribe((data) => {
        console.log(data);
        this.listsinhvien = data;
      });
  }
  openDialogChange(data: any): void {
    this.dialog.open(DialogChangeComponent, {
      width: '600px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        sinhvien: data,
        PhancongComponent: this,
      },
      disableClose: true,
    });
     console.log('ỳyufbjkb', data);
  }
}
