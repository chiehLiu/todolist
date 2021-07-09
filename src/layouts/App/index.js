import React from 'react';

import Header from 'components/organisms/Header';
import Footer from 'components/organisms/Footer';

const App = ({ children }) => (
	<>
		<Header />
		{children}
		<Footer />
	</>
);

export default App;
