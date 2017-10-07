import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  warnings = [
    'Còn 5 ngày nữa thu hoạch',
    'Chưa hoàn thành gieo giống khu vực 1 : Nguyễn Ngọc Diễm , Trần Trịnh Thanh Liêm',
    'Chưa dọn vệ sinh 23.08.2017 : Lại Thị Hồng Nguyên',
    'Họp toàn thể nhà B1 : 2 ngày tới'
  ]
  constructor() {

  }

  ngOnInit() {

  }

}
