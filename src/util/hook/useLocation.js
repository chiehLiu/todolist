import { useState, useEffect } from 'react';

const useLocation = history => {
	const [location, setLocation] = useState(history.location);

	useEffect(() => {
		const unlisten = history.listen(l => setLocation(l));
		return () => unlisten();
	}, [history]);

	return location;
};

export default useLocation;
