import React from 'react';

import styles from './index.css';

const PageLayout = ({ PageHeader, PageContent }) => () => (
	<div className={styles.page}>
		<header>{PageHeader}</header>
		<div>
			<PageContent />
		</div>
	</div>
);

export default PageLayout;
