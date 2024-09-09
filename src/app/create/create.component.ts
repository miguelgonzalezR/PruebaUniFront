import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Producto } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  newProduct: Producto = {
    nombreProducto: '',
    descripcionProducto: '',
    precio: 0,
    stock: 0,
    fechaIngreso: new Date().toISOString()  // Fecha actual en formato ISO
  };

  constructor(private apiService: ApiService) {}

  createProduct() {
    this.apiService.createProducto(this.newProduct).subscribe(
      response => {
        console.log('Producto creado', response);
      },
      error => {
        console.error('Error creando producto', error);
      }
    );
  }

}
