import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    children: [
      {
        path: '',
        loadChildren: () => import("./get/get.module").then(m => m.GetModule)
      },
      {
        path: 'search',
        loadChildren: () => import("./search/search.module").then(m => m.SearchModule)
      },
      {
        path: 'orders',
        loadChildren: () => import("./order/order.module").then(m => m.OrderModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import("./checkout/checkout.module").then(m => m.CheckoutModule)
      },
      {
        path: 'new',
        loadChildren: () => import("./create/create.module").then(m => m.CreateModule)
      },
      {
        path: ':id',
        loadChildren: () => import("./detail/detail.module").then(m => m.DetailModule)
      },
      {
        path: ':id/edit',
        loadChildren: () => import("./edit/edit.module").then(m => m.EditModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}