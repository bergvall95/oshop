import { Product, ProductId } from './models/product';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  create(product){
    return this.db.collection<Product>('products').add(product);
  }
  getAll(){
    return this.db.collection<Product>('products').snapshotChanges().pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, data} as ProductId;

    })));
  }
  getProduct(productId){
    return this.db.collection<Product>('products').doc(productId).get().pipe(map(action =>{
      return action.data();
    }));
  }

  update(productId, product){
    return this.db.collection<Product>('products').doc(productId).update(product);
  }

  delete(productId){
    return this.db.collection('products').doc(productId).delete();
  }
}
