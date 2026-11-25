import { Nanoid8Entity } from "../../common/entities/nanoid-8.entity.js";
import { StoreProduct } from "../../stores/entities/store-product.entity.js";
import { Cart } from './cart.entity';
export declare class CartItem extends Nanoid8Entity {
    cartId: string;
    cart: Cart;
    storeProductId: string;
    storeProduct: StoreProduct;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
