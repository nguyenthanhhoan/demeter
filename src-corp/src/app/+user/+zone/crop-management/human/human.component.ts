import { Component, OnInit } from '@angular/core';
declare var moment: any;
@Component({
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.scss']
})
export class HumanComponent implements OnInit {
  activeTab = 0;
  orgCharts = [{
    role: 'Quản lí nhà B1',
    members: [{
      full_name: 'Nguyễn Xuân Đông',
      avatar: 'assets/img/demo-dmt/daily-report/nguyenxuandong.png'
    }]
  }, {
    role: 'Tổ trưởng nhà B1',
    members: [{
      full_name: 'Phan Thị Ái Vân',
      avatar: 'assets/img/demo-dmt/daily-report/phanthiaivan.png'
    }]
  }, {
    role: 'Công nhân B1',
    members: [{
      full_name: 'Lại Thị Hồng Nguyên',
      avatar: 'assets/img/demo-dmt/daily-report/laithihongnguyen.png'
    }, {
      full_name: 'Nguyễn Ngọc Diễm',
      avatar: 'assets/img/demo-dmt/daily-report/nguyenngocdiem.png'
    }, {
      full_name: 'Trần Trịnh Thanh Liêm',
      avatar: 'assets/img/demo-dmt/daily-report/trantrinhthanhliem.jpg'
    }]
  }];
  humans = [{
    full_name: 'Nguyễn Xuân Đông',
    role_name: 'Quản lí nhà B1',
    degree_of: 'Kĩ sư Nông nghiệp',
    cmnd: '191654356',
    dob: moment('27/08/1989', 'DD/MM/YYYY').format('DD/MM/YYYY'),
    phone: '093 622 4505',
    email: 'dong.nguyen@gmail.com',
    place_of_origin: 'Quãng Nam',
    image: 'assets/img/demo-dmt/daily-report/nguyenxuandong.png',
    description: `
      Trách nhiệm :
      <ol>
        <li>Chịu trách nhiệm toàn bộ các vấn đề liên quan đến sản xuất nhà B1 :
            - Chịu hoàn toàn trách nhiệm về kĩ thuật canh tác
            - Chịu trách nhiệm quản lí công nhà B1 ( chấm công ,...)
            - Chịu trách nhiệm năng suất và chất lượng nhà B1 theo kế 
              hoạch đặt ra ( đã cam kết )
        </li>
        <li>
          Chịu trách nhiệm báo cáo hàng ngày cho Giám Đốc sản xuất
        </li>
      </ol>
      Quyền hạn :
      <ol>
        <li>Được phép quyết định về các vấn đề duyệt công , nghỉ phép ,
          cho nghỉ việc công nhân khi không thỏa mãn nhu cầu công việc
        </li>
        <li>Được quyền quyết định các vấn đề về kĩ thuật , giống và đề xuất
          thử nghiệm ( phải được Giám Đốc sản xuất duyệt )
        </li>
      </ol>
    `
  }, {
    full_name: 'Phan Thị Ái Vân',
    role_name: 'Tổ trưởng nhà B1',
    degree_of: 'Kĩ sư Nông nghiệp',
    cmnd: '19628654',
    dob: moment('25/04/1993', 'DD/MM/YYYY').format('DD/MM/YYYY'),
    phone: '0163 455 6705',
    email: 'aivan.phanthi@gmail.com',
    place_of_origin: 'Bình Thuận',
    image: 'assets/img/demo-dmt/daily-report/phanthiaivan.png',
    description: `
      Trách nhiệm :
      <ol>
        <li>Chịu trách nhiệm toàn bộ các vấn đề liên quan đến sản xuất nhà B1 :
            - Chịu hoàn toàn trách nhiệm về kĩ thuật canh tác
            - Chịu trách nhiệm quản lí công nhà B1 ( chấm công ,...)
            - Chịu trách nhiệm năng suất và chất lượng nhà B1 theo kế 
              hoạch đặt ra ( đã cam kết )
        </li>
        <li>
          Chịu trách nhiệm báo cáo hàng ngày cho Giám Đốc sản xuất
        </li>
      </ol>
      Quyền hạn :
      <ol>
        <li>Được phép quyết định về các vấn đề duyệt công , nghỉ phép ,
          cho nghỉ việc công nhân khi không thỏa mãn nhu cầu công việc
        </li>
        <li>Được quyền quyết định các vấn đề về kĩ thuật , giống và đề xuất
          thử nghiệm ( phải được Giám Đốc sản xuất duyệt )
        </li>
      </ol>
    `
  }, {
    full_name: 'Lại Thị Hồng Nguyên',
    role_name: 'Nhân viên Nông Trại',
    degree_of: 'Trung Học cơ sở',
    cmnd: '191645678',
    dob: moment('07/08/1994', 'DD/MM/YYYY').format('DD/MM/YYYY'),
    phone: '093 432 5675',
    email: 'nguyenlaihong@gmail.com',
    place_of_origin: 'Bà Rịa - Vũng Tàu',
    image: 'assets/img/demo-dmt/daily-report/laithihongnguyen.png',
    description: `
      Trách nhiệm :
      <ol>
        <li>Chịu trách nhiệm điều phối , giám sát công nhà B1
            - Chịu hoàn toàn trách nhiệm điều phối công , đảm bảo công nhân hoàn thành
            công việc đặt ra trong ngày
            - Điều phối công dưới sự cho phép của Quản lí nhà B1 Nguyễn Xuân Đông
        </li>
        <li>
        Chịu trách nhiệm báo cáo hàng ngày cho Quản lí B1 Nguyễn Xuân Đông
        </li>
      </ol>
      Quyền hạn :
      <ol>
        <li>Được phép quyết định về các vấn đề duyệt công , nghỉ phép ,
          công nhân khi không thỏa mãn nhu cầu công việc ( Quản lí duyệt )
        </li>
      </ol>
    `
  }, {
    full_name: 'Trần Trịnh Thanh Liêm',
    role_name: 'Nhân viên Nông Trại',
    degree_of: 'Trung học phổ thông',
    cmnd: '194563657',
    dob: moment('21/08/1990', 'DD/MM/YYYY').format('DD/MM/YYYY'),
    phone: '098 892 4765',
    email: 'liemtrantrinh@gmail.com',
    place_of_origin: 'Đà Lạt',
    image: 'assets/img/demo-dmt/daily-report/trantrinhthanhliem.jpg',
    description: `
      Trách nhiệm :
      <ol>
        <li>Chịu trách nhiệm toàn bộ các vấn đề liên quan đến sản xuất nhà B1 :
            - Chịu hoàn toàn trách nhiệm về kĩ thuật canh tác
            - Chịu trách nhiệm quản lí công nhà B1 ( chấm công ,...)
            - Chịu trách nhiệm năng suất và chất lượng nhà B1 theo kế 
              hoạch đặt ra ( đã cam kết )
        </li>
        <li>
          Chịu trách nhiệm báo cáo hàng ngày cho Giám Đốc sản xuất
        </li>
      </ol>
      Quyền hạn :
      <ol>
        <li>Được phép quyết định về các vấn đề duyệt công , nghỉ phép ,
          cho nghỉ việc công nhân khi không thỏa mãn nhu cầu công việc
        </li>
        <li>Được quyền quyết định các vấn đề về kĩ thuật , giống và đề xuất
          thử nghiệm ( phải được Giám Đốc sản xuất duyệt )
        </li>
      </ol>
    `
  }, {
    full_name: 'Nguyễn Ngọc Diễm',
    role_name: 'Nhân viên Nông Trại',
    degree_of: 'Trung học phổ thông',
    cmnd: '195783957',
    dob: moment('11/04/1994', 'DD/MM/YYYY').format('DD/MM/YYYY'),
    phone: '098 952 6586',
    email: 'diemngnguyen@gmail.com',
    place_of_origin: 'Quãng Nam',
    image: 'assets/img/demo-dmt/daily-report/nguyenngocdiem.png',
    description: `
      Trách nhiệm :
      <ol>
        <li>Chịu trách nhiệm toàn bộ các vấn đề liên quan đến sản xuất nhà B1 :
            - Chịu hoàn toàn trách nhiệm về kĩ thuật canh tác
            - Chịu trách nhiệm quản lí công nhà B1 ( chấm công ,...)
            - Chịu trách nhiệm năng suất và chất lượng nhà B1 theo kế 
              hoạch đặt ra ( đã cam kết )
        </li>
        <li>
          Chịu trách nhiệm báo cáo hàng ngày cho Giám Đốc sản xuất
        </li>
      </ol>
      Quyền hạn :
      <ol>
        <li>Được phép quyết định về các vấn đề duyệt công , nghỉ phép ,
          cho nghỉ việc công nhân khi không thỏa mãn nhu cầu công việc
        </li>
        <li>Được quyền quyết định các vấn đề về kĩ thuật , giống và đề xuất
          thử nghiệm ( phải được Giám Đốc sản xuất duyệt )
        </li>
      </ol>
    `
  }];
  constructor() {

  }

  ngOnInit() {

  }

}
