import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {
  private apiUrl = 'https://localhost:7089/api/Productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  getProductoid(id: number): Observable<Producto> {
    console.log(`${this.apiUrl}/${id}`)
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}


export interface Producto {
  nombreProducto: string;
  descripcionProducto: string;
  precio: number;
  stock: number;
  fechaIngreso: string; 
}