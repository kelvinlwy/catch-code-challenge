import React from 'react';
import { shallow } from 'enzyme';

import ProductList from '../ProductList';
import { useProductsContext } from "../../../contexts/productsContext";
import ProductItem from "../../ProductItem/ProductItem";

jest.mock('../../../contexts/productsContext');

useProductsContext.mockImplementation(() => {
  return {
    productsState: {
      products: [
        {
          id: 'a'
        },
        {
          id: 'b'
        }
      ]
    },
  };
});

describe('test ProductList component', () => {
  afterEach(jest.clearAllMocks);

  test('should render component correctly', () => {
    const wrapper = shallow(<ProductList/>);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find(ProductItem)).toHaveLength(2);
    expect(wrapper.find(ProductItem).at(0).prop('product')).toMatchObject({ id: 'a' });
    expect(wrapper.find(ProductItem).at(1).prop('product')).toMatchObject({ id: 'b' });
  });
});
