import { Product, ProductId } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
 products: ProductId[];
 filteredProducts: any[];
 subscription: Subscription;
  constructor(private productService: ProductService) {
   }

  ngOnInit(): void{
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });
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
