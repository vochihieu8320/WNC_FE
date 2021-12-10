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
        path: 'new',
        loadChildren: () => import("./create/create.module").then(m => m.CreateModule)
      },
      {
        path: ':id/edit',
        loadChildren: () => import("./edit/edit.module").then(m => m.EditModule)
      },
      {
        path: 'orders/:id',
        loadChildren: () => import("./detail/detail.module").then(m => m.DetailModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}