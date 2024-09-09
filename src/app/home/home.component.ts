import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  constructor(private api: ApiService){}

  ngOnInit(): void{
    this.llenarData()
  }

  llenarData(): void{
    this.api.getProductos().subscribe(data => {
      this.data = data;
      console.log(this.data);
    },
    (error) => {
      console.error('Error al obtener los productos', error);
    }
  )
  }


  // Eliminar un producto por ID
  eliminarProducto(idProducto: number): void {
    if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.api.deleteProducto(idProducto).subscribe(
        () => {
          console.log('Producto eliminado');
          // Actualizamos la lista de productos tras la eliminación
          this.data = this.data.filter(item => item.idProducto !== idProducto);
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }

}
