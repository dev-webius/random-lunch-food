import { Routes, Route } from 'react-router-dom';

import UserView from './../views/user/UserView';
import UserMainView from './../views/user/UserMainView';
import UserDeliveryView from '../views/user/UserDeliveryView';

export default function UserRouter() {
	return <>
		<Routes>
			<Route path="/" element={<UserView />}>
				<Route index element={<UserMainView />} />
				<Route path="delivery" element={<UserDeliveryView />} />
			</Route>
		</Routes>
	</>;
}