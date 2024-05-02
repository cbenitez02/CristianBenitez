import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './interfaces';

import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

const routes: Routes = [
  {
    path: AppRoutes.home,
    component: HomeComponent,
  },
  {
    path: AppRoutes.new,
    component: AddProductComponent
  },
  {
    path: AppRoutes.update,
    component: UpdateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
