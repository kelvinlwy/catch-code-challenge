import React from 'react';
import { render, screen } from "../../../utils-test/customRender";

import ProductItem from '../ProductItem';

describe('test ProductItem component', () => {
  test('should render component correctly', () => {
    const mockItem = {
      id: 'abcd',
      imageUrl: 'http://localhost/test.svg',
      name: 'Test Name',
      quantityAvailable: 12,
      retailPrice: 2000,
      salePrice: 1500,
    };

    const { container, findByText } = render(<ProductItem product={mockItem}/>);
    expect(findByText(container, mockItem.name)).toBeTruthy();
    expect(screen.queryByText('SOLD OUT')).not.toBeInTheDocument();
    expect(findByText(container, '$20.00')).toBeTruthy();
    expect(findByText(container, '$15.00')).toBeTruthy();

  });

  test('should render component correctly with sold out message', () => {
    const mockItem = {
      id: 'abcd',
      imageUrl: 'http://localhost/test.svg',
      name: 'Test Name',
      quantityAvailable: 0,
      retailPrice: 2000,
      salePrice: 1500,
    };

    const { container, findByText } = render(<ProductItem product={mockItem}/>);
    expect(findByText(container, 'SOLD OUt')).toBeTruthy();
  });
});
