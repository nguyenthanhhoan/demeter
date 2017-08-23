import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  staffs = [{
    full_name: 'Nguyễn Xuân Đông',
    role_name: 'Quản lí nhà B1',
    image: 'assets/img/demo-dmt/daily-report/nguyenxuandong.png',
    images: [{
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh1.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh2.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh3.jpg'
    }],
    tasks: [{
      name: 'Xuống giống khu vực  2 nhà B1 ( 5000 cây )',
      checked: true
    }, {
      name: 'Lắp hệ thống châm phân tự động dự phòng',
      checked: true
    }, {
      name: 'Họp với giám đốc sản xuất về thử nghiệm giống mới',
      checked: false
    }, {
      name: 'Họp toàn công nhân nhà B1 để tổng kết lúc 5pm',
      checked: true
    }],
    note: 'Phát sinh sự cố bộ châm phân tự động do hụt nước nên tiến độ bị chậm'
  }, {
    full_name: 'Phan Thị Ái Vân',
    role_name: 'Tổ trưởng nhà B1',
    image: 'assets/img/demo-dmt/daily-report/phanthiaivan.png',
    images: [{
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh4.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh5.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh6.jpg'
    }],
    tasks: [{
      name: 'Điều công d chuyển 5000 cây từ vườn rươm ra khu số 2',
      checked: true
    }, {
      name: 'Giám sát công nhân bỏ rọ cây vào ống ( 5000 cây )',
      checked: true
    }, {
      name: 'Họp toàn công nhân B1 lúc 5pm',
      checked: true
    }]
  }, {
    full_name: 'Lại Thị Hồng Nguyên',
    role_name: 'Nhân viên Nông Trại nhà B1',
    image: 'assets/img/demo-dmt/daily-report/laithihongnguyen.png',
    images: [{
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh7.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh8.jpg'
    }],
    tasks: [{
      name: 'Sắp cây khu vực ươm vào két ( 5000 cây từ khu vực 2 )',
      checked: true
    }, {
      name: 'Vệ sinh khu vực làm việc',
      checked: true
    }, {
      name: 'Họp tổng kết lúc 5pm',
      checked: true
    }]
  }, {
    full_name: 'Nguyễn Thị Ngọc Diếm',
    role_name: 'Nhân viên Nông trại nhà B1',
    image: 'assets/img/demo-dmt/daily-report/nguyenngocdiem.png',
    images: [{
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh9.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh10.jpg'
    }],
    tasks: [{
      name: 'Lấy cây từ khu vực tập kết đến khu vực 2 ( 5000 cây )',
      checked: true
    }, {
      name: 'Sắp cây vào ống',
      checked: true
    }, {
      name: 'Vệ sinh khu làm việc',
      checked: true
    }, {
      name: 'Họp lúc 5pm',
      checked: true
    }]
  }, {
    full_name: 'Trần Trịnh Thanh Liêm',
    role_name: 'Nhân viên Nông trại nhà B1',
    image: 'assets/img/demo-dmt/daily-report/trantrinhthanhliem.jpg',
    images: [{
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh11.jpg'
    }, {
      title: '',
      src: 'assets/img/demo-dmt/daily-report/anh12.jpg'
    }],
    tasks: [{
      name: 'Nhận bộ châm phân từ bộ phận vật tư',
      checked: true
    }, {
      name: 'Tiến hành lắp thử nghiệm ở khoan cách ly',
      checked: true
    }, {
      name: 'Vệ sinh khu vực làm việc',
      checked: true
    }, {
      name: 'Họp lúc 5pm',
      checked: true
    }]
  }];

  constructor() {

  }

  ngOnInit() {

  }

}
