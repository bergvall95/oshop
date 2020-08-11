import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, Query } from '@angular/core';
import { map } from 'rxjs/operators';
export interface Category{
  name: string;
}

export interface CategoryId extends Category{
  id: string;
}
@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private db: AngularFirestore) {
  }

  getCategories(){
    return this.db.collection<Category>('categories', ref => ref.orderBy('name'))
      .snapshotChanges().pipe( map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Category;
        const id = a.payload.doc.id;
        return {id, ...data };
      })));
  }
}
