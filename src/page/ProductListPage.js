import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './ProductListPage.module.scss';
import ProductList from '../components/ProductList/ProductList';
import Header from '../components/Header/Header';
import useFetchGet from '../hooks/fetch/useFetchGet';
import { useProductsContext } from '../contexts/productsContext';

const ProductListPage = () => {
  const { response, fetch } = useFetchGet();
  const [heading, setHeading] = useState();
  const { setProducts } = useProductsContext();

  useEffect(() => {
    if (fetch) {
      fetch('http://catch-code-challenge.s3-website-ap-southeast-2.amazonaws.com/challenge-3/response.json');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      const { metadata: { query }, results } = response;
      setHeading(query);
      if (setProducts) setProducts(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className={clsx(styles['product-page'], 'page__container')}>
      <Header title={heading} />
      <ProductList />
    </div>
  );
};

export default ProductListPage;
