import React from 'react';

import ToggleButton from 'components/atoms/ToggleButton';
import List from 'components/atoms/List';

const SwitchList = ({ onOpen, onClose, items }) => (
	<div>
		<ToggleButton onOpen={onOpen} onClose={onClose} />
		<List items={items} />
	</div>
);

export default SwitchList;
