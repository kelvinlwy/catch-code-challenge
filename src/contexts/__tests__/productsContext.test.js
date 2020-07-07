import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import ProductsContextProvider, {
  productsContextActions,
  productsContextReducer,
  useProductsContext
} from '../productsContext';

describe('test productsContext', () => {
  const mockProductWithLowestPrice = {
    id: 'abcd',
    imageUrl: 'http://localhost/test.svg',
    name: 'Test Product',
    quantityAvailable: '144',
    retailPrice: '200',
    salePrice: '100',
  };
  const mockProductWithHighestPrice = {
    id: 'abcd',
    imageUrl: 'http://localhost/test.svg',
    name: 'Test Product',
    quantityAvailable: '144',
    retailPrice: '200',
    salePrice: '150',
  };
  const mockProducts = [
    mockProductWithLowestPrice,
    mockProductWithHighestPrice,
  ];

  test('useProductsContext should return correct properties', async () => {
    const { result } = renderHook(() => useProductsContext(), {
      // eslint-disable-next-line react/display-name,react/prop-types
      wrapper: ({ children }) => (
        <ProductsContextProvider>
          {children}
        </ProductsContextProvider>
      )
    });
    expect(result.current).toHaveProperty('productsState');
    expect(result.current).toHaveProperty('productsDispatch');
    expect(result.current).toHaveProperty('setProducts');
    expect(result.current).toHaveProperty('sortProducts');
  });

  test('should return expected "products" object when setting products using setProducts()', async () => {
    const { result } = renderHook(() => useProductsContext(), {
      // eslint-disable-next-line react/display-name,react/prop-types
      wrapper: ({ children }) => (
        <ProductsContextProvider value={{ mockProducts }}>
          {children}
        </ProductsContextProvider>
      )
    });
    const { setProducts } = result.current;
    await act(async () => setProducts(mockProducts));
    expect(result.current.productsState).toMatchObject({ products: mockProducts });
    expect(result.current.productsState.products).toEqual([mockProductWithHighestPrice, mockProductWithLowestPrice]);
    expect(result.current.productsState.products).not.toEqual([mockProductWithLowestPrice, mockProductWithHighestPrice]);
  });

  test('should return expected sortPriceBy value when updating the sortBy factor using sortProducts()', async () => {
    const { result } = renderHook(() => useProductsContext(), {
      // eslint-disable-next-line react/display-name,react/prop-types
      wrapper: ({ children }) => (
        <ProductsContextProvider value={{ mockProducts }}>
          {children}
        </ProductsContextProvider>
      )
    });
    const { sortProducts } = result.current;
    await act(async () => sortProducts('desc'));
    expect(result.current.productsState).toMatchObject({ sortPriceBy: 'desc' });

    await act(async () => sortProducts('asc'));
    expect(result.current.productsState).toMatchObject({ sortPriceBy: 'asc' });
  });

  test('it should throw error when no context provider supplied', () => {
    try {
      renderHook(() => useProductsContext());
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toEqual('useProductsContext must be used with a ProductsContextProvider');
    }
  });

  describe('test productsContextReducer', () => {
    test('should return expected "products" object when dispatch action with type "SET_PRODUCTS', () => {
      const setProductAction = productsContextReducer(null, {
        type: productsContextActions.SET_PRODUCTS,
        payload: { products: mockProducts }
      });
      expect(setProductAction).toMatchObject({ products: mockProducts });
    });

    test('should return expected sortPriceBy value when dispatch action with type "SORT_PRODUCTS', () => {
      const setProductAction = productsContextReducer(null, {
        type: productsContextActions.SORT_PRODUCTS,
        payload: { sortPriceBy: 'desc' }
      });
      expect(setProductAction).toMatchObject({ sortPriceBy: 'desc' });
    });

    test('should throw an error when dispatch action with invalid type', () => {
      try {
        productsContextReducer(null, { type: 'INVALID_TYPE' });
      } catch (e) {
        expect(e.message).toEqual('Unhandled action type: INVALID_TYPE');
      }
    });
  });
});
