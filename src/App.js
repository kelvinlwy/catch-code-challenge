import React from 'react';

import ProductsContextProvider from './contexts/productsContext';
import ProductListPage from './page/ProductListPage';

const App = () => (
  <ProductsContextProvider>
    <ProductListPage />
  </ProductsContextProvider>
);

export default App;
