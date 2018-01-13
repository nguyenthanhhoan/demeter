import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from '../api/api.service';

@Injectable()
export class BrandService {

    private _mockBrands: any[];

    constructor(private apiService: ApiService) {
        this._mockBrands = [
            {
                id: 1,
                name: 'Công ty CP AGRIEVOVLE',
                code: 'CT-100001',
                description: 'AGRIEVOVLE là trang trại trồng hữu cơ được thành lập vào đầu năm 2013 với mục tiêu giúp người tiêu dùng Việt Nam có một cuộc sống khỏe mạnh hơn thông qua những loại thực phẩm hữu cơ có chứng nhận, thực phẩm tự nhiên và không có nguồn gốc biến đổi gene (GMO). Chúng tôi đầu tư sản xuất các loại thực phẩm hữu cơ và lựa chọn các loại thực phẩm hữu cơ, thực phẩm tự nhiên từ các nhà sản xuất, các công ty trong và ngoài nước thông qua quá trình lựa chọn kỹ càng về khả năng cung ứng, các giấy chứng nhận tiêu chuẩn do các tổ chức uy tín thế giới cấp. Chúng tôi tin rằng tất cả mọi người đều có quyền sử dụng thực phẩm sạch và tốt cho sức khỏe. Tuy nhiên, ở điều kiện Việt Nam hiện nay điều này dường như quá xa vời. Là một công ty nhỏ mới khởi nghiêp, chúng tôi không ngừng nỗ lực để phục vụ khách hàng trần thạch caonhững sản phẩm tốt, an toàn, nhanh chóng với giá cả phải chăng. Chúng tôi luôn mong muốn được hợp tác với những nhà sản xuất, nhà cung cấp tại địa phương để tạo ra những sản phẩm tốt nhất cho người Việt',
                kind: 'Trồng trọt',
                location: '14 Phan Chu Trinh , Đà Lạt',
                location_geometry: 'map\'s location',
                email: 'info@agrievovle.com',
                logo: 'assets/img/brands/brand_1.jpg'
            },
            {
                id: 2,
                name: 'Công ty TNHH TRÀ XANH KENKO',
                code: 'CT-100002',
                description: 'Nằm ở độ cao 1700m so với mặt nước biển , đồi chè rộng hơn 300 ha của KENKO hiện lên như một tấm thảm xanh trải dài bất tận . KENKO tự hào là đơn vị sản xuất bột trà xanh hữu cơ chất lượng cao đạt chứng nhận Hữu Cơ châu Âu . Sản phẩm của KENKO được phân phối đến hơn 30 quốc gia trên toàn thế giới và là quá tặng đẳng cấp trong những sự kiện quan trọng . Triết lí của KENKO là lấy nông nghiệp thuận tự nhiên làm gốc rễ , thuận theo tự nhiên cũng có nghĩa là chọn con đường hạnh phúc . ',
                kind: 'Trồng trọt',
                location: 'Lâm Đồng , Việt Nam',
                location_geometry: 'map\'s location',
                email: 'salel@kenko.com',
                logo: null
            },
            {
                id: 3,
                name: 'Công ty CP CRISPY',
                code: 'CT-100003',
                description: 'CRISPY là công ty dẫn đầu về sấy các loại hoa quả tươi có nguồn gốc Organic . Bằng phương pháp sấy thăng hoa hiện đại nhập khẩu từ Nhật . CRISPY tự hào là đơn vị tiên phong ở Việt Nam trong công nghệ sấy . Sản phẩm đạt chứng nhận Organic từ châu Âu và xuất khẩu trên 50 quốc gia và vùng lĩnh thồ. ',
                kind: 'Trồng trọt',
                location: '14 Lý Thường Kiệt , Quãng Nam ',
                location_geometry: 'map\'s location',
                email: '"info@crispy.com',
                logo: 'assets/img/brands/brand_3.png'
            },
            {
                id: 4,
                name: 'Công ty CP HONEYBEE',
                code: 'CT-100004',
                description: 'HONEYBEE là trang trại nuôi ong chất lượng cao Cà Mau .. Mật Ong nguyên chất còn gọi là mật ong sống hay mật ong tươi, mật không qua đun nóng hay chế biến dưới bất kỳ hình thức nào, cũng không cho thêm hay lấy đi bất kỳ chất gì. Mật ong nguyên chất màu trong và vàng, những giọt mật được chắt lọc kỹ càng, hoàn toàn được lấy vào mùa hoa rừng ở U Minh - Cà Mau, mùa Ong cho mật chất lượng tốt nhất, mật mang hương vị đặc biệt của hoa tự nhiên, mùi thơm nhẹ, thanh nhưng có rất nhiều công dụng trong y học, chăm sóc sức khỏe. Mật ong nguyên chất được khai thác tự nhiên 100% trong những khu rừng ở U Minh - Cà Mau, giữ nguyên hương thơm và vị ngọt tự nhiên được đa số người tiêu dùng trong và ngoài nước tin dùng và ưa chuộng',
                kind: 'Chế biến',
                location: '12  Phan Chu Trinh , Cà Mau',
                location_geometry: 'map\'s location',
                email: 'info@honeybee.com',
                logo: 'assets/img/brands/brand_4.jpg'
            }
        ]
     }

    getBrands(): any {
        return this._mockBrands;
    }

    getOne(id): any {
        let _brand = this._mockBrands.find((item: any) => {
            return item.id == id;
        });
        return _brand;
    }
}
