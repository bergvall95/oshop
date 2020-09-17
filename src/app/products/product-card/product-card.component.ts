import { ShoppingCartId, CartItem } from './../../models/shopping-carts';
import { ShoppingCartService } from './../../shopping-cart.service';
import { ProductId } from './../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
@Input('product') product: ProductId;
@Input('show-actions') showActions = true;
@Input('shopping-cart') shoppingCart: ShoppingCartId;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void{
   this.cartService.addToCart(this.product);
  }

}
