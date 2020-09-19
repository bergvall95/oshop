import { ShoppingCartId } from './../models/shopping-carts';
import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap, map } from 'rxjs/operators';
import { ProductId } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: ProductId[] = [];
  filteredProducts: ProductId[] = [];
  category: string;
  cart$: Observable<ShoppingCartId>;
  sub: Subscription;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ){}

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
  }
  private populateProducts(){
    this.productService.getAll().pipe(switchMap(products => {
      this.filteredProducts = this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
    });
  }
}
