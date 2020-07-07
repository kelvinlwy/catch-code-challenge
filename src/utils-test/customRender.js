import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

import ProductsContextProvider from '../contexts/productsContext';

const WithProviders = ({ children }) => (
  <ProductsContextProvider>
    {children}
  </ProductsContextProvider>
);

WithProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) => render(ui, { wrapper: WithProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
