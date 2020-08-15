import { Product, ProductId } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
 products: ProductId[];
 filteredProducts: any[];
 subscription: Subscription;
 dataSource: MatTableDataSource<Product>;
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private productService: ProductService) {
   }

  ngOnInit(): void{
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
    this.dataSource = new MatTableDataSource(this.filteredProducts);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  filter(query:string){
    this.filteredProducts = (query) ?
      this.products.filter(p => {
       return p.data.title.toLowerCase().includes(query.toLowerCase());
      }) :
      this.products;
  }
}
