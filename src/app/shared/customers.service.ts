import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http :HttpClient) { }
  private customers = new BehaviorSubject<any[]>([]); // initial empty list

  fetchFromExcel(){
    debugger
    const url = 'https://docs.google.com/spreadsheets/d/1bPXpxkY7K_L0oWqh7YYkrNqOrAb-56FFO3Gpv2pq8cQ/gviz/tq?tqx=out:json&gid=2046424579#gid=2046424579';
           
    this.http.get(url, { responseType: 'text' }).subscribe((res: string) => {
     
      debugger;
      const json = JSON.parse(
        res.substring(47).slice(0, -2)
      );
      const rows = json.table.rows;
    
     
      this.customers = rows.map((row: any) => ({ 
        id: row.c[0]?.v || '',
        name: row.c[1]?.v || '',
        phone: row.c[2]?.v || '',
        email: row.c[3]?.v || ''
      }));
      console.log(this.customers);
  
    });
  
  }
}
