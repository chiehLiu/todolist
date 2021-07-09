import React from 'react';

const List = ({ items }) => (
	<ul>
		{items.map(item => (
			<li key={item.key} data-testid={item.key}>
				{item.value}
			</li>
		))}
	</ul>
);

export default List;
