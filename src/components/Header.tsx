import React, { useEffect, useState } from 'react';
import Trolley from '../assets/trolley.svg';
import BasketModal from './BasketModal';
import { getQuery, updateQuery } from '../helpers/url';
import { getAllCategories } from '../helpers/api';
import './Header.css';

type HeaderProps = {
    onChangeFilter: () => void;
}

const Header = ({ onChangeFilter }: HeaderProps) => {
    const [showBasketModal, setShowBasketModal] = useState<boolean>(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [inputCategory, setInputCategory] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sorting, setSorting] = useState<string>('');
    const [order, setOrder] = useState<string>('asc');

    useEffect(() => {
        fetchCategories();
        setupFilters();
    }, []);

    const fetchCategories = () => {
        getAllCategories().then((res) => {
            setCategories(res.data);
        })
    }

    const setupFilters = () => {
        const selectedCategory = getQuery("category");
        const selectedSorting = getQuery("sort");
        const selectedOrder = getQuery("order");
        setSelectedCategory(selectedCategory);
        setSorting(selectedSorting);
        setOrder(selectedOrder);
    }

    const onChangeInputCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCategory(event.target.value);
    }

    const filteredCategories = () => {
        if (!inputCategory) return [];
        return categories.filter((category) => category.toLowerCase().includes(inputCategory.toLowerCase()));
    }

    const selectCategory = (selectedItem: string) => {
        setSelectedCategory(selectedItem);
        updateQuery("category", selectedItem);
        setInputCategory('');
        onChangeFilter();
    }

    const clearCategory = () => {
        setSelectedCategory('');
        updateQuery("category", '');
        onChangeFilter();
    }

    const onChangeSortingOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        if (!selected || selected === 'default') {
            updateQuery('sort', '');
            updateQuery('order', '');
            setOrder('asc');
        } else {
            updateQuery('sort', selected);
            updateQuery('order', order);
        }
        setSorting(selected);
        onChangeFilter();
    }

    const onChangeOrder = () => {
        const newOrder = order === 'asc' ? 'desc' : 'asc'
        setOrder(newOrder);
        updateQuery('order', newOrder);
        onChangeFilter();
    }

    return (
        <div>
            <div style={{ width: '100%', display: 'inline-block' }}>
                <span style={{ fontSize: '30px', float: 'left' }}>E-Commerce</span>
                <div style={{ float: 'right' }} onClick={() => setShowBasketModal(true)}>
                    <img src={Trolley} style={{ width: 32 }} alt='trolley' />
                </div>
            </div>
            <div style={{ marginTop: 15, marginBottom: 15 }}>
                <div style={{ marginRight: 10 }}>
                    <div className="filters">
                        <input
                            placeholder="Search Categories"
                            value={inputCategory}
                            type="text"
                            onChange={onChangeInputCategory}
                            className="filter-input"
                        />
                        <div className="sorting">
                            <select className="sorting-select" value={sorting} onChange={onChangeSortingOption}>
                                <option hidden>Sort By</option>
                                <option value="default">Default</option>
                                <option value="price">Price</option>
                                <option value="rating">Rating</option>
                            </select>
                            {["price", "rating"].includes(sorting) &&
                                <button
                                    className="sorting-btn"
                                    type="button"
                                    onClick={onChangeOrder}
                                >
                                    {order === 'asc' ? <span>&#9651;</span> : <span>&#9661;</span>}
                                </button>
                            }
                        </div>
                    </div>
                    {
                        inputCategory && filteredCategories().length > 0 && (
                            <div className='categories-dropdown'>
                                {filteredCategories().map((category) => (
                                    <div>
                                        <div onClick={() => selectCategory(category)} className="category-item">{category}</div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
                {selectedCategory &&
                    <div className='selected-category'>
                        {selectedCategory}
                        <span onClick={clearCategory} className='category-close-btn'>&times;</span>
                    </div>
                }
            </div>
            <BasketModal onClose={() => setShowBasketModal(false)} isOpen={showBasketModal} />
        </div>
    );
}

export default Header;
