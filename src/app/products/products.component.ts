import { ShoppingCartId } from './../models/shopping-carts';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap, map } from 'rxjs/operators';
import { ProductId } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: ProductId[] = [];
  filteredProducts: ProductId[] = [];
  category: string;
  cart: ShoppingCartId;
  sub: Subscription;
  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) {
      productService.getAll().pipe(switchMap(products => {
        this.filteredProducts = this.products = products;
        return route.queryParamMap;
    }))
      .subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
        });
      }

  async ngOnInit(){
    this.sub = (await this.shoppingCartService.getCart()).subscribe( cart => {
      this.cart = cart;
    });
  }

  OnDestroy(): void{
    this.sub.unsubscribe();
  }
}
