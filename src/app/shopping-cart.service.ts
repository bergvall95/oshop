import { CartItem, ShoppingCartId } from './models/shopping-carts';
import { ProductId } from './models/product';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private db:AngularFirestore) { }
  prodExists: boolean;
  cartItems: CartItem;
  numItems: number;

  create(){
    return this.db.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCartId>>{
    const cartId = await this.getOrCreateCartId();
    const cart = await this.db.collection('shopping-carts')
      .doc(cartId).collection<CartItem>('items').snapshotChanges().pipe(map( actions => {
            const itemsMap: {[productId: string]: CartItem } = {};
            const items = actions.map( a => {
              const item = { id: a.payload.doc.id, data: a.payload.doc.data()};
              return item;
            });
            for (let item of items){
              itemsMap[item.id] = item.data;
            }

            return new ShoppingCartId(itemsMap);
            }));
    return cart;
  }


  async addToCart(product: ProductId){
    this.updateItem(product, 1 );
  }

  async removeFromCart(product: ProductId){
    this.updateItem(product, -1 );
  }

  async clearCart(){
    const cartId = await this.getOrCreateCartId();
    const collectionRef = this.db.collection('shopping-carts').doc(cartId).collection('items').ref;
    collectionRef.get().then(res => {
      res.forEach(element => {
        element.ref.delete();
      });
    });
  }


  private async updateItem(product: ProductId, change: number): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);

    const data = item$.get().pipe(map(action => {
      this.prodExists = action.exists;
      return action.data();
    }));

    data.subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0 ) { item$.delete(); }

      if (this.prodExists){
        item$.update({ product, quantity: item.quantity + change});
      }
      else{
        item$.set({product, quantity: 1});
      }
    });
  }

  private async getOrCreateCartId(): Promise<string>{
    const cartId = localStorage.getItem('cartId');

    if (cartId){
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }


  private getItem(cartId: string, productId: string){
    const item = this.db.collection('shopping-carts')
      .doc(cartId)
        .collection('items')
          .doc(productId);
    return item;
  }

}
