import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }
  private categories = new BehaviorSubject<any[]>([]); // initial empty list

  fetchFromExcel(){
    debugger
    const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json&gid=2046424579#gid=2046424579';
           
    this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
     
      debugger;
      const json = JSON.parse(
        res.substring(47).slice(0, -2)
      );
      const rows = json.table.rows;
    
     
      this.categories = rows.map((row: any) => ({ 
        id: row.c[0]?.v || '',
        name: row.c[1]?.v || '',
        description: row.c[2]?.v || ''
      }));
      console.log(this.categories);
  
    });
  
  }


  getCategories(): Observable<any[]> {
    return this.categories.asObservable(); // ✅ safe
  }
  addCategory(category: any) {
    const currentCategories = this.categories.getValue();
    this.categories.next([...currentCategories, category]);
  }
  updateCategory(updatedCategory: any) {
    const currentCategories = this.categories.getValue();
    const index = currentCategories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      currentCategories[index] = updatedCategory;
      this.categories.next(currentCategories);
    }
  }
  deleteCategory(id: string) {
    const currentCategories = this.categories.getValue();
    const updatedCategories = currentCategories.filter(c => c.id !== id);
    this.categories.next(updatedCategories);
  }
  getCategoryById(id: string): Observable<any> {
    const currentCategories = this.categories.getValue();
    const category = currentCategories.find(c => c.id === id);
    return new BehaviorSubject(category).asObservable();
  }

}
