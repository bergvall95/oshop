import { Router } from '@angular/router';
import { ProductId } from './../models/product';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartId } from '../models/shopping-carts';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private cartService:ShoppingCartService) { }
  cart$: Observable<ShoppingCartId>;
  cart: ShoppingCartId;
  totalItems;
  cartArray: ShoppingCartId;

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalItems = cart.totalItemsCount;
    });
  }

  clearCart(){
    this.cartService.clearCart();
  }

}
