import { Routes, Route } from 'react-router-dom';

import Homepage from 'components/pages/homepage';
import MainBackground from 'components/layout/mainBackground';

function App() {
	return (
		<>
			<div className="App">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/:organization/:contactName/:position/:contactNumber/:email/:user/:website" element={<Homepage />} />
				</Routes>

				<MainBackground />
			</div>
		</>
	);
}

export default App;
