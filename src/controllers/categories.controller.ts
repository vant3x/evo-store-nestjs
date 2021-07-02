import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
      // varios params
  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `product ${productId} and category ${id}`;
  }
}
