import React, { useState } from "react";
import { ProductModel } from "../models/product";
import Modal from "./Modal";
import { addToBasket, getCountInBasket } from "../helpers/basket";
import './ProductModal.css';
import LazyImage from "./LazyImage";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductModel;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
    const [counter, setCounter] = useState<number>(1);

    const addProductToBasket = () => {
        addToBasket(product, counter);
        onClose();
        setCounter(1);
    }

   const inBasket = getCountInBasket(product.id);

    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="product-details">
                <LazyImage src={product.image} alt={product.title} className="product-detail-image" />
                <span className="product-rating">{product.rating.rate} ⭐ ({product.rating.count}) rating</span>
                <h2 className="product-title">{product.title}</h2>
                <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            <div className="modal-description">
                <p>{product.description}</p>
            </div>
            <div className="add-to-basket">
                <button className="minus-btn" disabled={counter === 1} onClick={() => { setCounter(counter - 1) }}>-</button>
                <span className="count">{counter}</span>
                <button className="plus-btn" onClick={() => { setCounter(counter + 1) }}>+</button>
                <button className="add-btn" onClick={addProductToBasket}>Add to Basket</button>
            </div>
            {inBasket > 0 && <div className="basket-marker">{inBasket} in basket</div>}

        </Modal>
    );
};

export default ProductModal;
