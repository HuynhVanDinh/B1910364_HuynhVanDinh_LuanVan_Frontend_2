import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TuanService } from 'src/app/tuan.service';

@Component({
  selector: 'app-phancong-congviec',
  templateUrl: './phancong-congviec.component.html',
  styleUrls: ['./phancong-congviec.component.css'],
})
export class PhancongCongviecComponent implements OnInit {
  tuans: any[] = [];
  constructor(private tuanService: TuanService) {}
  ngOnInit(): void {
    this.getTuan();
  }
  getTuan() {
    this.tuanService.getAllTuan().subscribe((data) => {
       this.tuans = data;
      console.log('data nè', data);
    });
  }

}
