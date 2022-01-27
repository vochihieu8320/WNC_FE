import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: '',
    data: {
      title: 'Forgot password'
    },
    children: [
      {
          path:'',
          loadChildren: () => import("./get/get.module").then(m => m.GetModule)
      },
      {
        path:':regcode',
        loadChildren: () => import("./update/update.module").then(m => m.UpdateModule)
      }
     
      
  ]
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPWDRoutingModule {}
