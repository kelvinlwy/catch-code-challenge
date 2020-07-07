import React from 'react';
import { shallow, mount } from "enzyme";

import ProductListPage from '../ProductListPage';
import useFetchGet from '../../hooks/fetch/useFetchGet';
import { useProductsContext } from "../../contexts/productsContext";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";

jest.mock('../../hooks/fetch/useFetchGet', () => ( {
  __esModule: true,
  default: jest.fn(),
} ));

const mockFetch = jest.fn();

useFetchGet.mockImplementation(() => ( {
  fetch: mockFetch,
} ));

const mockSetProducts = jest.fn();

jest.mock('../../contexts/productsContext');

useProductsContext.mockImplementation(() => {
  return {
    setProducts: mockSetProducts,
    productsState: {
      products: []
    }
  };
});

describe('test ProductListPage', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });

  afterEach(jest.clearAllMocks);

  test('should render component correctly', () => {
    const wrapper = shallow(<ProductListPage/>);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(ProductList)).toHaveLength(1);
  });

  test('should have fetch() to be fired on load', () => {
    useFetchGet.mockImplementation(() => ( {
      fetch: mockFetch,
      response: {
        metadata: {
          query: 'Title'
        },
        results: [
          {
            id: 'a'
          }
        ]
      }
    } ));

    mount(<ProductListPage/>);
    expect(mockFetch).toHaveBeenCalled();
    expect(mockSetProducts).toHaveBeenCalled();
  });
});
