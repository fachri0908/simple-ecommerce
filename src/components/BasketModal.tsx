import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { BasketItemModel } from "../models/basket";
import { addToBasket, getBasket, removeFromBasket } from "../helpers/basket";
import "./Basket.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BasketModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [items, setItems] = useState<BasketItemModel[]>([]);
    const [shoppingTotal, setShoppingTotal] = useState<number>(0);

    useEffect(() => {
        getBasketItems();
    }, [isOpen])

    const getBasketItems = () => {
        const basket = getBasket();
        setItems(basket);
        let total = 0;
        basket.forEach((item) => {
            total  = total + (item.product.price * item.count);
        })
        setShoppingTotal(total);
    }

    const adjustProductCount = (isAdd: boolean, item: BasketItemModel) => {
        if(isAdd) {
            addToBasket(item.product, 1);
        } else {
            removeFromBasket(item.product);
        }
        getBasketItems()
    }

    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>My Basket</h2>
            {!items.length && <span>Your basket is empty</span>}
            {items.map((item) => (
                <div className="basket-item">
                    <img src={item.product.image} alt={item.product.title} className="basket-item-image" />
                    <div className="basket-item-info">
                        <h3 className="basket-item-title">{item.product.title}</h3>
                        <p className="basket-item-price">${item.product.price.toFixed(2)} &times; {item.count}</p>
                        <p className="basket-item-price-total">${(item.product.price * item.count).toFixed(2)}</p>

                    </div>
                    <div className="basket-item-controls">
                        <button className="basket-btn minus-btn" onClick={() => adjustProductCount(false, item)}>-</button>
                        <span className="basket-count">{item.count}</span>
                        <button className="basket-btn plus-btn" onClick={() => adjustProductCount(true, item)}>+</button>
                    </div>
                </div>
            ))}
            <h3 className="shopping-total">${shoppingTotal.toFixed(2)}</h3>
            {items.length > 0 && <button className="checkout-btn">Check out</button>}
        </Modal>
    );
};

export default BasketModal;
