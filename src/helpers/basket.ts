import { BasketItemModel } from "../models/basket";
import { ProductModel } from "../models/product";

export const getBasket = (): BasketItemModel[] => {
    const basket = localStorage.getItem('basket');
    return (basket) ? JSON.parse(basket) : [];
}

export const getCountInBasket = (productId: number): number => {
    const basket = getBasket();
    const selectedItem = basket.find((item) => item.product.id === productId);
    return selectedItem ? selectedItem.count : 0;
}

export const addToBasket = (product: ProductModel, count: number) => {
    const basket = [...getBasket()]
    const totalInBasket = getCountInBasket(product.id);
    if(totalInBasket > 0) {
        const selectedItemIndex = basket.findIndex((item) => item.product.id === product.id);
        basket[selectedItemIndex].count = basket[selectedItemIndex].count + count;
    } else {
        basket.push({
            product: product,
            count
        })
    }
    localStorage.setItem('basket',JSON.stringify(basket));
}

export const removeFromBasket = (product: ProductModel) => {
    const basket = [...getBasket()]
    const totalInBasket = getCountInBasket(product.id);
    const selectedItemIndex = basket.findIndex((item) => item.product.id === product.id);
    if(totalInBasket > 1) {
        basket[selectedItemIndex].count = basket[selectedItemIndex].count - 1;
    } else {
        basket.splice(selectedItemIndex, 1);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
}