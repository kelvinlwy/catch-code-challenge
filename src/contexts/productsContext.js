import React, { useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  products: [],
  sortPriceBy: 'desc',
};

const ProductsContext = React.createContext(initialState);

/**
 * Define action types
 */
const productsContextActions = {
  SORT_PRODUCTS: 'SORT_PRODUCTS',
  SET_PRODUCTS: 'SET_PRODUCTS',
};

/*
 * Define specific actions correlated to products
 * and throw error when attempting to update state with non-defined action type
 */
const productsContextReducer = (prevState = initialState, { type, payload }) => {
  if (!type) return initialState;

  switch (type) {
    case productsContextActions.SORT_PRODUCTS: {
      const { sortPriceBy, products } = payload;

      return {
        ...prevState,
        products,
        sortPriceBy,
      };
    }
    case productsContextActions.SET_PRODUCTS: {
      return {
        ...prevState,
        products: payload.products,
      };
    }

    default:
      throw new Error('Unhandled action type: INVALID_TYPE');
  }
};

const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProductsContext must be used with a ProductsContextProvider');
  const [productsState, productsDispatch] = context;

  const setProducts = (products) => {
    const sortedProducts = (products || []).sort((a, b) => (productsState.sortPriceBy === 'desc' ? b.salePrice - a.salePrice : a.salePrice - b.salePrice));

    productsDispatch({
      type: productsContextActions.SET_PRODUCTS,
      payload: { products: sortedProducts },
    });
  };

  const sortProducts = (sortPriceBy) => {
    const products = productsState.products.sort((a, b) => (sortPriceBy === 'desc' ? b.salePrice - a.salePrice : a.salePrice - b.salePrice));

    productsDispatch({
      type: productsContextActions.SORT_PRODUCTS,
      payload: {
        sortPriceBy,
        products,
      },
    });
  };

  return {
    productsState,
    productsDispatch,
    setProducts,
    sortProducts,
  };
};

const ProductsContextProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(productsContextReducer, initialState);
  const value = useMemo(() => [productsState, productsDispatch], [productsState]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  ProductsContextProvider as default,
  useProductsContext,
  productsContextReducer,
  productsContextActions,
};
