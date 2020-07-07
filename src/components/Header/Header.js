import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';
import SortingSelector from '../SortingSelector/SortingSelector';

/**
 * This component renders the header of the page which
 * consists of the logo, the heading, and the sorting selector
 */
const Header = ({ title }) => (
  <header className={styles.header}>
    <a href="/" title="Catch" aria-label="Homepage">
      <div className={styles.logo}>
        <img src={Logo} alt="Catch.com.au" aria-label="logo" />
      </div>
    </a>

    <h1 className={styles.title}>{title}</h1>

    <SortingSelector />
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};

export default Header;
