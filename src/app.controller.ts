import { Controller, Get, Param } from '@nestjs/common';
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

  // params forma 1
  @Get('products/:id')
  getProduct(@Param() params: any) {
    return `product ${params.id}`;
  }

  // params forma 2
  @Get('product/:id')
  getProduct2(@Param('id') id: string) {
    return `product ${id}`;
  }

  // varios params
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `product ${productId} and category ${id}`;
  }
}
