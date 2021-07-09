import React from 'react';
import Link from 'components/atoms/Link';
import styles from './index.css'

const Navigator = () => (
	<nav>
		<ul className={styles.list}>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/blogs">Todo List</Link>
			</li>
		</ul>
	</nav>
);

export default Navigator;
