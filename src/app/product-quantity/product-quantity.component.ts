import { ProductId } from './../models/product';
import { ShoppingCartId } from './../models/shopping-carts';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent  {

  @Input('product') product: ProductId;
  @Input('shopping-cart') shoppingCart: ShoppingCartId;

  constructor(private cartService: ShoppingCartService) { }

  getQuantity(): number{
      return this.shoppingCart.getQuantity(this.product);
  }

  addToCart(): void {
     this.cartService.addToCart(this.product);
  }

  removeFromCart(): void {
     this.cartService.removeFromCart(this.product);
  }
}
