import React from 'react';
import { shallow, mount } from 'enzyme';
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

const customShallow = (node) => shallow(<WithProviders>{node}</WithProviders>);

const customMount = (node) => mount(<WithProviders>{node}</WithProviders>);

// Override mount method
export { customMount as mount };

// Override shallow method
export { customShallow as shallow };
