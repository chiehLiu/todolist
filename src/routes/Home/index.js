import React from 'react';
import {
	hot
} from 'react-hot-loader/root';



import styles from './index.css';

const Home = () => ( <
	div >
	<
	div className = {
		styles.welcome
	} >
	Welcome to < br / >
	Chieh 's Todo List <
	br / >
	This is on {
		process.env.NODE_ENV
	}
	server < /div>

	<
	/div>
);

export default hot(Home);
