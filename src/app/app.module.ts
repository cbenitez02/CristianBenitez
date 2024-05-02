import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { SearchComponent } from './components/search/search.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { DropdownOptionsComponent } from './components/dropdown-options/dropdown-options.component';
import { TableSkeletonComponent } from './components/table-skeleton/table-skeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TableComponent,
    AddProductComponent,
    SearchComponent,
    UpdateProductComponent,
    ModalComponent,
    NotificationToastComponent,
    DropdownOptionsComponent,
    TableSkeletonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
