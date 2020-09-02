import { Product, ProductId } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild, Query } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})

export class AdminProductsComponent implements  OnDestroy{
 displayedColumns: string[] = ['title', 'price', 'edit'];
 products: ProductId[];
 filteredProducts: ProductId[];
 subscription: Subscription;
 dataSource: MatTableDataSource<ProductId>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dataSource = new MatTableDataSource(this.filteredProducts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    this.dataSource.disconnect();
  }


  filter(query: string): void{
    this.filteredProducts = (query) ?
      this.products.filter(p => {
       return p.title.toLowerCase().includes(query.toLowerCase());
      }) :
      this.products;
    this.dataSource.filter = query.trim().toLowerCase();
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }
}
