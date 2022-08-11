import { Routes, Route } from 'react-router-dom';

import AdminMainView from './../views/admin/AdminMainView';

export default function AdminRouter() {
	return <>
		<Routes>
			<Route path="/manage" element={<AdminMainView />} />
		</Routes>
	</>;
}