import { Observable } from 'rxjs';
import { ShoppingCartId } from './../../models/shopping-carts';
import { ShoppingCartService } from './../../shopping-cart.service';
import { ProductId } from './../../models/product';
import { Component, Input } from '@angular/core';

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
