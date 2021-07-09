import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../../entities/product.entity';

@Injectable()
export class ProductsService {
  // id incrementador
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla bla',
      price: 122,
      image: '',
      stock: 8,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    // manejo de errores
    const product = this.products.find((item) => item.id === id);
    // tecnica errorFirst => cancelar el proceso cuando hay un error de primeras y no continuar con ejecuciones 

    if (!product) {
      // lanzar throw random (pero no es beuna idea porque tenemos un error 500)
      // throw 'random error';
      throw new NotFoundException(`Product #${id} not found`);
  }
   return product;
}

  // payload any de momento
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // payload any de momento
  update(id: number, payload: any) {
    const product = this.findOne(id);
    if (product) {
      // obtener posicion
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }
}
