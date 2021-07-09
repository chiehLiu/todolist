import React from 'react';

import { useBoolean } from 'util/hook';

import style from './index.css';

const ToggleButton = ({ onClose, onOpen, closeTitle = 'Close', openTitle = 'Open' }) => {
	const [isOpen, { toggle }] = useBoolean({
		onTrue: onOpen,
		onFalse: onClose,
		defaultBoolean: true,
	});

	return (
		<button type="button" className={isOpen ? style.button : style.buttonReverse} onClick={toggle}>
			{isOpen ? closeTitle : openTitle}
		</button>
	);
};

export default ToggleButton;
