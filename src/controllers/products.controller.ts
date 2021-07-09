import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductsService } from './../services/products/products.service';

@Controller('products')
export class ProductsController {
  // el moto de nest va a resolver la inyección de depedencias, va a crear una instancia de Product service
  // y le pasa la instancia a nuestro controlador
  constructor(private productsService: ProductsService) {}
  // choque de rutas (dos rutas igual con diferente controlador) => rutas estaticas de primeras
  @Get('filter')
  getProductsFilter() {
    return `soy un filter`;
  }

  // params forma 1
  @Get(':id')
  // status code
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param() params: any) {
    /*return {
      message: `product ${params.id}`,
    }; */
    return this.productsService.findOne(+params.id);
  }

  // params forma 2
  @Get('params2/:id')
  getProduct2(@Param('id') id: string) {
    return `produ
    ct ${id}`;
  }

  // query 1
  @Get('')
  getProducts(@Query() params: any) {
    const { limit, offset } = params;
    //  return `products: limit => ${limit} offset => ${offset}`;
    return this.productsService.findAll();
  }

  // query 2
  @Get('2')
  getProducts2(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  // query 3 => params por defecto (no se necesita pasar todos en la url)
  @Get('products3')
  getProducts3(
    @Query('limit') limit = 20,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return `products: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  // Body recibir el cuerpo
  @Post()
  create(@Body() payload: any) {
    /* return {
      message: 'accion de crear',
      payload,
    }; */
    return this.productsService.create(payload);
  }

  // Body recibir el cuerpo params
  /* @Post()
  create(@Body('price') price: number) {
    return {
      message: 'accion de crear',
      payload
    };
  }*/

  // actualizar
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    /*return {
      id,
      payload,
    };*/
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
