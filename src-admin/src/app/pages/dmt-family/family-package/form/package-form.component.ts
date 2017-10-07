import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../_core/services/notification.service';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'dmt-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css'],
})
export class PackageFormComponent implements OnInit {

  package: any = {};
  mode: string;
  package_id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private packageService: PackageService) {

  }

  ngOnInit() {
    this.package_id = +this.route.snapshot.params['package_id'];
    if (this.package_id) {
      this.mode = 'Edit';
      this.packageService.getOne(this.package_id)
        .subscribe(data => {
          Object.assign(this.package, data);
        });
    } else {
      this.mode = 'Create';
    }
  }

  saveOrUpdate() {
    const submitPackage = this.package;
    if (this.mode === 'Edit') {
      this.packageService.put(submitPackage).subscribe(data => {
        this.notificationService.showMessage('Package updated successfully!');
        this.router.navigate([`/pages/family/package`]);
      });
    } else {
      this.packageService.post(submitPackage).subscribe(data => {
        this.notificationService.showMessage('Package created successfully!');
        this.router.navigate([`/pages/family/package`]);
      });
    }
  }

  generateSerial() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
    }
    function getRandomChar() {
      return alphabet[getRandomInt(0, 62)];
    }
    function getRandomChars(num) {
      let result = '';
      for (let index = 0; index < num; index++) {
        result += getRandomChar();
      }
      return result;
    }
    this.package.serial_name = `DMT${getRandomChars(4)}`;
  }
}
