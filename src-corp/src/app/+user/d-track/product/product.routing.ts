import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '', component: ProductComponent
  },
  {
    path: ':productId', component: ProductDetailComponent
  }
];

export const routing = RouterModule.forChild(routes);
