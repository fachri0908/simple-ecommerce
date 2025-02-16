import { ProductModel } from "./product"

export type BasketItemModel = {
    product: ProductModel;
    count: number;
}