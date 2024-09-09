import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Producto } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  updatedProduct: Producto = {
    nombreProducto: '',
    descripcionProducto: '',
    precio: 0,
    stock: 0,
    fechaIngreso: new Date().toISOString()
  };
  productId!: number;  // ID del producto que se va a actualizar

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute  // Para obtener el ID del producto desde la URL
  ) {}

  ngOnInit() {
    // Suscríbete a los cambios de parámetros de ruta
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');  // Capturamos el parámetro como string
      console.log('ID Param from URL:', idParam);  // Depuramos el valor que llega
      const id = idParam ? +idParam : 0;  // Convertimos a número solo si existe
      if (id) {
        this.productId = id;
        this.loadProduct(id);  // Cargar el producto si hay un ID
      } else {
        console.error('ID no válido:', idParam);  // Si el ID es nulo o no válido
      }
    });
  }

  loadProduct(id: number) {
    this.apiService.getProductoid(id).subscribe(
      (producto) => {
        this.updatedProduct = producto;
      },
      (error) => {
        console.error('Error al cargar el producto', error);
      }
    );
  }

  updateProduct() {
    this.apiService.updateProducto(this.productId, this.updatedProduct).subscribe(
      (response) => {
        console.log('Producto actualizado', response);
      },
      (error) => {
        console.error('Error actualizando producto', error);
      }
    );
  }

}
