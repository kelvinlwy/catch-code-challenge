import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ProductItem.module.scss';
import { formatCentsToDollars } from '../../utils/number';

/**
 * A component to render to display product detail
 */
const ProductItem = ({ product }) => {
  if (!product) return null;

  const {
    id, imageUrl, name, quantityAvailable, retailPrice, salePrice,
  } = product;

  return (
    <div
      className={clsx(
        styles.product__container,
        {
          'col-12-xs': true,
          'col-6-sm': true,
          'col-4-md': true,
          'grid-item': true,
        },
      )}
      key={id}
    >
      <div className={styles.product}>
        <div className={styles['product__image-container']}>
          <img
            className={styles.product__image}
            src={imageUrl}
            alt={name}
            aria-label="Product image"
          />
          {
            quantityAvailable === 0
            && <span className={styles.product__stockout}>Sold out</span>
          }
        </div>

        <h2 className={styles.product__title}>{name}</h2>

        <div className={styles['product__price-container']}>
          <p className={styles['product__retail-price']}>
            {retailPrice !== 0 && formatCentsToDollars(retailPrice)}
          </p>

          <p className={styles['product__sale-price']}>
            {formatCentsToDollars(salePrice)}
          </p>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    quantityAvailable: PropTypes.number,
    retailPrice: PropTypes.number,
    salePrice: PropTypes.number,
  }),
};

ProductItem.defaultProps = {
  product: null,
};

export default ProductItem;
