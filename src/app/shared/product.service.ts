import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http :HttpClient) {

    this.fetchFromExcel();
   }
  private products = new BehaviorSubject<any[]>([]); // initial empty list
 
  fetchFromExcel(){
    debugger
   // const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json&gid=2046424579#gid=2046424579';
   const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json';
           
    this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
     
      debugger;
      const json = JSON.parse(
        res.substring(47).slice(0, -2)
      );
      const rows = json.table.rows;
    
     
      this.products = rows.map((row: any) => ({ 
        id: row.c[0]?.v || '',
        name: row.c[1]?.v || '',
        Category: row.c[2]?.v || '',
        quantity: 1,
        UnitDesc:  row.c[4]?.v || '',
        RetailPrice:  row.c[5]?.v || 0,
        SalePrice: row.c[6]?.v || 0,
        MRP:  row.c[7]?.v || 0,
        UnitPrice: row.c[8]?.v || 0,
        EANCode:  row.c[9]?.v || '', 
      }));
      console.log(this.products);
  
    });
  
  }

  getProducts(): Observable<any[]> {
    return this.products.asObservable(); // ✅ safe
  }
  addProduct(product: any) {
    const currentProducts = this.products.getValue();
    this.products.next([...currentProducts, product]);
  }
  updateProduct(updatedProduct: any) {
    const currentProducts = this.products.getValue();
    const index = currentProducts.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
      this.products.next([...currentProducts]);
    }
  }
}
