import React, { useState, useEffect, useCallback } from 'react';
import LoadingIndicator from '../components/LoadingIndicator'
import Header from '../components/Header'
import { getProductList } from '../helpers/api'
import { ProductModel } from '../models/product';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { getQuery } from '../helpers/url';

const Home = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [fetching, setFetching] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [showProductModal, setShowProductModal] = useState<boolean>(false);

    const showProductDetail = (product: ProductModel) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    }

    const closeModal = () => {
        setShowProductModal(false);
    }

    const fetchProducts = useCallback(() => {
        setFetching(true)
        getProductList().then(res => {
            setProducts(sortProducts(res.data));
            setFetching(false);
        }).catch(() => {
            alert('failed to fetch data')
            setFetching(false)
        })
    }, []);
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    const sortProducts = (items: ProductModel[]) => {
        const sorting = getQuery('sort');
        const order = getQuery('order');
        if(!sorting || sorting === 'default') return items;
        if(sorting === 'price') {
            return items.sort((item, nextItem) => {
                if(order === 'asc') {
                    if(item.price < nextItem.price) return -1 
                    return 1
                } else {
                    if(item.price > nextItem.price) return -1 
                    return 1
                }
            })
        } else {
            return items.sort((item, nextItem) => {
                if(order === 'asc') {
                    if(item.rating.rate < nextItem.rating.rate) return -1 
                    return 1
                } else {
                    if(item.rating.rate > nextItem.rating.rate) return -1 
                    return 1
                }
            })
        }
    }

    return (
        <div className="content-container">
            <Header onChangeFilter={fetchProducts}/>
            {
                (!fetching) ?
                    <div className="product-container">
                        {
                            products.map((product: ProductModel, key: number) => (
                                <ProductCard product={product} onSelectProduct={() => showProductDetail(product)}/>
                            ))
                        }
                    </div>
                    : <LoadingIndicator />
            }
            
            {selectedProduct && <ProductModal isOpen={showProductModal} onClose={closeModal} product={selectedProduct} />}
        </div>
    );
}

export default Home;
