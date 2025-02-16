import React from "react";
import { ProductModel } from "../models/product";
import LazyImage from "./LazyImage";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel;
    onSelectProduct: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }: ProductCardProps) => {
    return (
        <div className="product-card" onClick={onSelectProduct}>
            <LazyImage
                src={product.image}
                alt={product.title}
                className="product-image"
            />
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <span className="product-price">${product.price}</span>
                <span className="product-rating">{product.rating.rate} ⭐ ({product.rating.count})</span>
            </div>
        </div>
    );
};

export default ProductCard;
