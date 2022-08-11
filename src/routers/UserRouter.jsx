import { Routes, Route } from 'react-router-dom';

import UserMainView from './../views/user/UserMainView';

export default function UserRouter() {
	return <>
		<Routes>
			<Route path="/" element={<UserMainView />}>
				{/* <Route path="delivery" element={<DeliveryComponent />} /> */ }
			</Route>
		</Routes>
	</>;
}