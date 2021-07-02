import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con slash';
  }


  // choque de rutas (dos rutas igual con diferente controlador) => rutas estaticas de primeras
  @Get('products/filter')
  getProductsFilter() {
    return `soy un filter`;
  }
  
  // params forma 1
  @Get('products/:id')
  getProduct(@Param() params: any) {
    return `product ${params.id}`;
  }

  // params forma 2
  @Get('product/:id')
  getProduct2(@Param('id') id: string) {
    return `produ
    ct ${id}`;
  }
  // varios params
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `product ${productId} and category ${id}`;
  }

  // query 1
  @Get('products')
  getProducts(@Query() params: any) {
    const { limit, offset } = params;
    return `products: limit => ${limit} offset => ${offset}`;
  }

  // query 2
  @Get('products2')
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

}
