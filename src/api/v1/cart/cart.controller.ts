import { Controller, Post } from '@nestjs/common';

@Controller('cart')
export class CartController {
    @Post()
    create() {}
}
