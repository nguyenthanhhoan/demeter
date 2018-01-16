import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProductService {

    private _mockProducts: any[];

    constructor(private apiService: ApiService) {
        this._mockProducts = [
            {
                id: '1',
                code: 'PRO-00001',
                name: 'Xoài tứ quý hữu cơ',
                imageUrl: 'assets/img/brands/products/brand1_product1.jpg',
                description: 'Xoài tứ quý chất lượng cao',
                price: 20000
            },
            {
                id: '2',
                code: 'PRO-00002',
                name: 'Sầu riêng ri 6 chín cây',
                imageUrl: 'assets/img/brands/products/brand1_product2.jpg',
                description: 'Sầu riêng đạt chuẩn ISO 2000',
                price: 30000
            },
            {
                id: '3',
                code: 'PRO-00003',
                name: 'Matcha hữu cơ cao cấp',
                imageUrl: 'assets/img/brands/products/brand2_product1.jpg',
                description: 'Trà Matcha Việt Nam chất lượng Hoa Kì',
                price: 40000
            },
            {
                id: '4',
                code: 'PRO-00004',
                name: 'LÊ SẤY THĂNG HOA',
                imageUrl: 'assets/img/brands/products/brand3_product1.jpg',
                description: 'Lê sấy ăn vào là thăng hoa',
                price: 50000
            },
            {
                id: '5',
                code: 'PRO-00005',
                name: 'CAM SẤY THĂNG HOA',
                imageUrl: 'assets/img/brands/products/brand3_product2.jpg',
                description: 'Cam sấy ăn vào là thăng hoa',
                price: 50000
            },
            {
                id: '6',
                code: 'PRO-00006',
                name: 'Mật ong Cao cấp',
                imageUrl: 'assets/img/brands/products/brand4_product1.jpg',
                description: 'Mật ông chính gốc nhà làm',
                price: 60000
            }
        ]
     }

    getAll(): any {
        return this._mockProducts;
    }

    getOne(id): any {
        let _product = this._mockProducts.find((item: any) => {
            return item.id == id;
        });
        return _product;
    }
}
