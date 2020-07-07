import React, { useState } from 'react';

import styles from './SortingSelector.module.scss';
import { useProductsContext } from '../../contexts/productsContext';

/**
 * This selector element allow the user to sort products
 * by sale price in either descending order or ascending order.
 */
const SortingSelector = () => {
  const [sortBy, setSortBy] = useState('desc');
  const { sortProducts } = useProductsContext();

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    sortProducts(event.target.value);
  };

  return (
    <select
      className={styles.selector}
      aria-label="Price Sorting"
      tabIndex={0}
      onChange={handleSortChange}
      value={sortBy}
    >
      <option value="desc">Price (high to low)</option>
      <option value="asc">Price (low to high)</option>
    </select>
  );
};

export default SortingSelector;
