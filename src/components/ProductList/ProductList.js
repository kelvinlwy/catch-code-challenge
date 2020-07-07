import React from 'react';
import clsx from 'clsx';

import ProductItem from '../ProductItem/ProductItem';
import { useProductsContext } from '../../contexts/productsContext';

/**
 * The product list component is in use to render the list container containing all product items
 */
const ProductList = () => {
  const { productsState } = useProductsContext();
  const { products } = productsState;

  return (
    <div className={clsx({ 'grid-container': true })}>
      {products.map((item) => (<ProductItem product={item} key={item.id} />))}
    </div>
  );
};

export default ProductList;
