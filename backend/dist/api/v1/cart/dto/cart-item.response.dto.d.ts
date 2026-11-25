import { StoreProduct } from '../../stores/entities/store-product.entity';
export declare class CartItemResponseDto {
    id: string;
    cartId: string;
    storeProductId: string;
    quantity: number;
    storeProduct: StoreProduct;
    createdAt: Date;
    updatedAt: Date;
    get lineTotal(): number;
}
