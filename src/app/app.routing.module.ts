import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {AuthGuard} from './helper/authguard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        canActivate:[AuthGuard],
        path: 'products',
        loadChildren: () => import("./theme/products/products.module").then(m => m.ProductsModule)
      },
      {
        path: 'auth',
        loadChildren: () => import("./theme/auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: 'user',
        loadChildren: () => import("./theme/user/user.module").then(m => m.UserModule)
      }
    ]

  }
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }