import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private static readonly ROOT_ENDPOINT = 'products';

  constructor(private db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection(ProductService.ROOT_ENDPOINT).snapshotChanges().pipe(map(docArray => {
      return docArray.map((doc: any) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
          /* Same as
             name: doc.payload.doc.data().name,
             date: doc.payload.doc.data().date,
             description: doc.payload.doc.data().description,
          */
        };
      });
    }));
  }

  createProduct(product: Product): any {
    return this.db.collection(ProductService.ROOT_ENDPOINT).add(product);
  }

  getProductById(id: string): any {
    return this.db.collection(ProductService.ROOT_ENDPOINT).doc(id).ref.get().then((doc) => doc.data());
  }

  updateProduct(product: Product): any {
    return this.db.doc(ProductService.ROOT_ENDPOINT + '/' + product.id).set(product);
  }

  deleteProduct(id: string): any {
    return this.db.doc(ProductService.ROOT_ENDPOINT + '/' + id).delete();
  }
}
