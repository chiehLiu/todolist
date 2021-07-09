import React from 'react';

import Navigation from 'components/molecules/Navigation';

import styles from './index.css';

const Header = () => (
	<header className={styles.header}>
		<h2>This is Todo List</h2>
		<Navigation />
	</header>
);

export default Header;
