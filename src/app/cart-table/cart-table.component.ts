import { ShoppingCartId } from './../models/shopping-carts';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
@Input() shoppingCart: ShoppingCartId;
@Input() showExtras = true;
  constructor() { }

  ngOnInit(): void {
  }

}
