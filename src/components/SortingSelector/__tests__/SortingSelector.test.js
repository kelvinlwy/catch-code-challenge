import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent, render } from "@testing-library/react";

import SortingSelector from '../SortingSelector';
import { useProductsContext } from "../../../contexts/productsContext";

const mockSortProducts = jest.fn();

jest.mock('../../../contexts/productsContext');

useProductsContext.mockImplementation(() => {
  return {
    sortProducts: mockSortProducts,
  };
});

describe('test SortingSelector component', () => {
  afterEach(jest.clearAllMocks);

  test('should render component correctly', () => {
    const wrapper = shallow(<SortingSelector/>);
    expect(wrapper.find('select')).toHaveLength(1);
    expect(wrapper.find('select').find('option')).toHaveLength(2);
    expect(wrapper.find('select').find('option').at(0).text()).toEqual('Price (high to low)');
    expect(wrapper.find('select').find('option').at(1).text()).toEqual('Price (low to high)');
  });

  test('should support selector change', () => {
    const { container, findByText } = render(<SortingSelector/>);
    const element = container.querySelector('select');
    expect(mockSortProducts).toHaveBeenCalledTimes(0);
    fireEvent.change(element, { target: { value: 'asc' } });
    expect(mockSortProducts).toHaveBeenCalled();
    expect(mockSortProducts).toHaveBeenCalledTimes(1);
    expect(element.value).toEqual('asc');
    expect(findByText(container, 'Price (low to high')).toBeTruthy();
  });
});
